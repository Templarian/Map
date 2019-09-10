import { LightningElement } from 'lwc';

export default class World extends LightningElement {
  connectedCallback() {
    this.template.host.style.left = `${Math.floor((window.innerWidth - 64) / 2)}px`;
    this.template.host.style.top = `${Math.floor((window.innerHeight - 64) / 2)}px`;
  }
}
