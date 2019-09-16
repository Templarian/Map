import { LightningElement, track } from 'lwc';
import Popper from 'popper.js';
import { getCursor } from './getCursor';

export default class ContextMenu extends LightningElement {
  $menu: HTMLElement | null = null;
  $menuFocus: boolean = false;

  contextMenuHandler: any;
  mouseDownHandler: any;

  constructor() {
    super();

    this.contextMenuHandler = this.handleContextMenu.bind(this);
    this.mouseDownHandler = this.handleMouseDown.bind(this);
  }

  handleContextMenu(e: MouseEvent) {
    document.addEventListener('mousedown', this.mouseDownHandler);
    const applyReactStyle = (data: any) => {
      // export data in your framework and use its content to apply the style to your popper
      for (let i in data.styles) {
        this.$menu!.style[i] = data.styles[i];
      }
      this.$menu!.style.zIndex = '1';
      this.$menu!.style.position = 'fixed';
      this.$menu!.style.display = 'initial';
    }
    new Popper(getCursor(e), this.$menu as Element, {
      placement: 'bottom-start',
      modifiers: {
        applyStyle: { enabled: false },
        applyReactStyle: {
          enabled: true,
          fn: applyReactStyle,
          order: 900,
        }
      } as any,
    });
    e.preventDefault();
  }

  handleMouseDown(e: MouseEvent) {
    if (!this.$menuFocus) {
      this.$menu!.style.display = 'none';
      document.removeEventListener('mousedown', this.mouseDownHandler);
    }
  }

  handleSlotChange(e: Event) {
    const slot = this.template.childNodes[1] as HTMLSlotElement;
    const slotElements = slot.assignedElements();
    slotElements.forEach(element => {
      element.addEventListener('contextmenu', this.contextMenuHandler);
    });
  }

  handleMenuSlotChange(e: Event) {
    const slot = this.template.childNodes[2] as HTMLSlotElement;
    const slotElements = slot.assignedElements() as HTMLElement[];
    if (slotElements.length === 0) {
      throw new Error('contextMenu missing menu slot.');
    }
    if (slotElements.length > 1) {
      throw new Error('contextMenu must only contain one root element in the menu slot.');
    }
    const menu = slotElements[0];
    menu.style.display = 'none';
    menu.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    menu.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    menu.addEventListener('click', this.handleMouseClick.bind(this));
    this.$menu = menu;
  }

  handleMouseEnter() {
    this.$menuFocus = true;
  }

  handleMouseLeave() {
    this.$menuFocus = false;
  }

  handleMouseClick() {
    this.$menu!.style.display = 'none';
    document.removeEventListener('mousedown', this.mouseDownHandler);
  }

}