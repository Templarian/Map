import { LightningElement, api } from 'lwc';

export default class AddTile extends LightningElement {
  @api tile: any = null;

  get x() {
    return this.tile.coordinate[0];
  }

  get y() {
    return this.tile.coordinate[1];
  }

  get computedClass() {
    return '';
  }

  renderedCallback() {
    const [x, y] = this.tile.gridCoordinate || [0, 0];
    const ele = this.template.host as HTMLElement;
    ele.style.setProperty('--column', x);
    ele.style.setProperty('--row', y);
  }

  handleClick() {
    this.dispatchEvent(new CustomEvent('addtile', {
      detail: {
        x: this.tile.coordinate[0],
        y: this.tile.coordinate[1]
      },
      bubbles: true,
      composed: true
    }));
  }
}
