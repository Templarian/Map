import { LightningElement, api } from 'lwc';
import WorldModel from 'models/world';

export default class World extends LightningElement {
  @api world: WorldModel | null = null;

  renderedCallback() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  resize() {
    // Map
    const div = this.template.childNodes[1] as HTMLElement;
    div.style.left = `${Math.floor((window.innerWidth - 64) / 2)}px`;
    div.style.top = `${Math.floor((window.innerHeight - 64) / 2)}px`;
    // Background Dots
    var rect = div.getBoundingClientRect();
    const host = this.template.host as HTMLElement;
    const x = Math.floor((rect.left + window.scrollX) % 64);
    const y = Math.floor((rect.top + window.scrollY) % 64);
    host.style.backgroundPositionX = `${x}px`;
    host.style.backgroundPositionY = `${y}px`;
  }

}
