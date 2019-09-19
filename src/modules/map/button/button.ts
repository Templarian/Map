import { LightningElement, api } from 'lwc';
import { mdiMenuUp, mdiMenuDown } from '@mdi/js';

interface Slot {
  component: string,
  name: string | null,
  variant: string | null
}

export default class Button extends LightningElement {
  @api variant: string = 'default';
  
  mdiMenuUp: string = mdiMenuUp;
  mdiMenuDown: string = mdiMenuDown;

  handleClick(e: Event) {
    //this.dispatchEvent(e);
  }

  get computedClass() {
    return `variant-${this.variant}`;
  }

  connectedCallback() {
    this.addEventListener('slot', this.slot as EventListener);
  }

  slot({ target, detail: slot }: CustomEvent<Slot>) {
    const iconElement = target as Element;
    const slotName = slot.name ? `-${slot.name}` : '';
    const classes = [
      `${slot.component}-slot${slotName}`,
      `${slot.component}-slot${slotName}-${slot.variant}`
    ];
    iconElement.className = classes.join(' ');
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
