import { LightningElement, api } from 'lwc';

interface Slot {
  component: string,
  slot: string,
  variant: string | null
}

export default class Tile extends LightningElement {

  _path: string = '';

  @api
  get path() {
    return this._path;
  }
  set path(path: string) {
    this._path = path;
  }

  connectedCallback() {
    this.addEventListener('slot', this.slot as EventListener);
  }

  slot({ target, detail: slot }: CustomEvent<Slot>) {
    (target as Element).className = `${slot.component}-slot-${slot.slot}-${slot.variant}`;
  }

}
