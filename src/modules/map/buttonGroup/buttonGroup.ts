import { LightningElement, api } from 'lwc';

export default class Button extends LightningElement {
  @api variant: string = 'default';

  get computedClass() {
    return `variant-${this.variant}`;
  }

}
