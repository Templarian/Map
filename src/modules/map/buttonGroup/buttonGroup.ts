import { LightningElement, api } from 'lwc';

export default class ButtonGroup extends LightningElement {
  @api variant: string = 'default';

  get computedClass() {
    return `variant-${this.variant}`;
  }

  handleSlotChange(e: Event) {
    const slot = this.template.childNodes[1] as HTMLSlotElement;
    const slotElements = slot.assignedElements();
    slotElements.forEach(element => {
      element.dispatchEvent(new CustomEvent('slot', {
        detail: {
          component: 'buttonGroup',
          name: null,
          variant: this.variant
        }
      }));
    });
  }

}
