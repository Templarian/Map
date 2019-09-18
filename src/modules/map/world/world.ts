import { LightningElement, api } from 'lwc';
import WorldModel from 'models/world';

export default class World extends LightningElement {
  $world: WorldModel | null = null;
  $hash: string = '3, 3';

  @api
  get hash() {
    return this.$hash;
  }
  set hash(hash: string) {
    if (this.$world) {
      const host = this.template.host as HTMLElement;
      host.style.setProperty('--grid-width', `${this.$world.width}`);
      host.style.setProperty('--grid-height', `${this.$world.height}`);
    }
    this.$hash = hash;
  }

  @api
  get world() {
    return this.$world;
  }
  set world(world: WorldModel | null) {
    if (world) {
      const host = this.template.host as HTMLElement;
      const x = Math.floor(this.offsetX % 64);
      const y = Math.floor(this.offsetY % 64);
      host.style.setProperty('--offset-x', `${this.offsetX}px`);
      host.style.setProperty('--offset-y', `${this.offsetY}px`);
      host.style.setProperty('--grid-offset-x', `${x}px`);
      host.style.setProperty('--grid-offset-y', `${y}px`);
      host.style.setProperty('--grid-width', `${world.width}`);
      host.style.setProperty('--grid-height', `${world.height}`);
    }
    this.$world = world;
  }

  offsetX: number = 10;
  offsetY: number = 10;

  renderedCallback() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  resize() {
    // Get Offset
    const x = Math.floor(this.offsetX % 64);
    const y = Math.floor(this.offsetY % 64);
    // Host
    const host = this.template.host as HTMLElement;
    //div.style.marginLeft = `${Math.floor((window.innerWidth - 64) / 2)}px`;
    //div.style.marginTop = `${Math.floor((window.innerHeight - 64) / 2)}px`;
    // Background Dots
    host.style.backgroundPositionX = `${x}px`;
    host.style.backgroundPositionY = `${y}px`;
  }

}
