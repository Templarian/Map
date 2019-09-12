import { LightningElement } from 'lwc';

export default class World extends LightningElement {

  renderedCallback() {
    const div = this.template.childNodes[1] as HTMLElement;
    div.style.left = `${Math.floor((window.innerWidth - 64) / 2)}px`;
    div.style.top = `${Math.floor((window.innerHeight - 64) / 2)}px`;
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  resize() {
    const div = this.template.childNodes[1] as HTMLElement;
    var rect = div.getBoundingClientRect();
    const host = this.template.host as HTMLElement;
    host.style.backgroundPositionX = `${rect.left % 64}px`;
    host.style.backgroundPositionY = `${rect.top % 64}px`;
  }

}
