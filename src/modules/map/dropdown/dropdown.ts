import { LightningElement, api, track } from 'lwc';
import Popper, { Data } from 'popper.js';

export default class Dropdown extends LightningElement {
  $menu: HTMLElement | null = null;
  $menuFocus: boolean = false;
  $menuButton: Element | null = null;

  @api offsetTop: number | string = 0;
  @api offsetLeft: number | string = 0;

  @track isOpen: boolean = false;

  contextMenuHandler: any;
  mouseDownHandler: any;
  mouseEnterMenuHandler: any;
  mouseLeaveMenuHandler: any;

  constructor() {
    super();

    this.contextMenuHandler = this.handleContextMenu.bind(this);
    this.mouseDownHandler = this.handleMouseDown.bind(this);
    this.mouseEnterMenuHandler = this.handleMouseEnterMenu.bind(this);
    this.mouseLeaveMenuHandler = this.handleMouseLeaveMenu.bind(this);
  }

  handleContextMenu(e: MouseEvent) {
    if(this.isOpen && this.$menuFocus) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  handleMouseDown(e: MouseEvent) {
    if (!this.$menuFocus) {
      this.isOpen = false;
      document.removeEventListener('mousedown', this.mouseDownHandler);
    }
  }

  handleSlotChange(e: Event) {
    const slot = this.template.childNodes[1] as HTMLSlotElement;
    const slotElements = slot.assignedElements();
    const menuButton = slotElements[0];
    menuButton.addEventListener('click', this.contextMenuHandler);
    menuButton.addEventListener('mouseenter', this.mouseEnterMenuHandler);
    menuButton.addEventListener('mouseleave', this.mouseLeaveMenuHandler);
    this.$menuButton = menuButton;
  }

  handleMenuSlotChange(e: Event) {
    const slot = this.template.childNodes[2] as HTMLSlotElement;
    if (slot) {
      console.log('menu slot changed');
      const slotElements = slot.assignedElements() as HTMLElement[];
      if (slotElements.length === 0) {
        throw new Error('contextMenu missing menu slot.');
      }
      if (slotElements.length > 1) {
        throw new Error('contextMenu must only contain one root element in the menu slot.');
      }
      const menu = slotElements[0];
      document.addEventListener('mousedown', this.mouseDownHandler);
      console.log(`${this.offsetLeft}px, ${this.offsetTop}px`);
      new Popper(this.$menuButton as Element, menu as Element, {
        placement: 'bottom-start',
        modifiers: {
          computeStyle: {
            gpuAcceleration: false
          },
          offset: {
            offset: `${this.offsetLeft}px, ${this.offsetTop}px`
          }
        } as any,
        onCreate: this.onPopperCreate.bind(this),
        onUpdate: this.onPopperUpdate.bind(this)
      });
      menu.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
      menu.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      menu.addEventListener('click', this.handleMouseClick.bind(this));
      this.$menu = menu;
    }
  }

  flipped = false;
  onPopperCreate(data: Data) {
    this.flipped = data.flipped;
  }

  onPopperUpdate(data: Data) {
    // Update Class
  }

  handleMouseEnter() {
    this.$menuFocus = true;
  }

  handleMouseLeave() {
    this.$menuFocus = false;
  }

  handleMouseClick() {
    this.isOpen = false;
    document.removeEventListener('mousedown', this.mouseDownHandler);
  }

  handleMouseEnterMenu() {
    this.$menuFocus = true;
  }

  handleMouseLeaveMenu() {
    this.$menuFocus = false;
  }

}