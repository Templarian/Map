import { LightningElement, api } from 'lwc';

export default class Button extends LightningElement {
  @api variant: string = 'default';

  handleClick(e: Event) {
    //this.dispatchEvent(e);
  }

  get computedClass() {
    return `variant-${this.variant}`;
  }

  handleLeftSlotChange(e: Event) {
    const button = this.template.childNodes[1];
    const leftSlot = button.childNodes[0] as HTMLSlotElement;
    const leftSlotElements = leftSlot.assignedElements();
    leftSlotElements.forEach(element => {
      element.dispatchEvent(new CustomEvent('slot', {
        detail: {
          component: 'button',
          name: 'left',
          variant: this.variant
        }
      }));
    });
  }

  handleSlotChange(e: Event) {
    const button = this.template.childNodes[1];
    const slot = button.childNodes[1] as HTMLSlotElement;
    const slotElements = slot.assignedElements();
    slotElements.forEach(element => {
      element.dispatchEvent(new CustomEvent('slot', {
        detail: {
          component: 'button',
          name: null,
          variant: this.variant
        }
      }));
    });
  }

  handleRightSlotChange(e: Event) {
    const button = this.template.childNodes[1];
    const rightSlot = button.childNodes[2] as HTMLSlotElement;
    const rightSlotElements = rightSlot.assignedElements();
    rightSlotElements.forEach(element => {
      element.dispatchEvent(new CustomEvent('slot', {
        detail: {
          component: 'button',
          name: 'right',
          variant: this.variant
        }
      }));
    });
  }

}
