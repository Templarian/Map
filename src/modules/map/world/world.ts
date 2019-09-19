import { LightningElement, api, track } from 'lwc';
import WorldModel from 'models/world';

export default class World extends LightningElement {
  $world: WorldModel | null = null;
  $hash: string = '3, 3';

  mouseDownHandler: any;
  mouseUpHandler: any;
  mouseMoveHandler: any;
  addTileHandler: any;

  constructor() {
    super();
    this.mouseDownHandler = this.handleMouseDown.bind(this);
    this.mouseUpHandler = this.handleMouseUp.bind(this);
    this.mouseMoveHandler = this.handleMouseMove.bind(this);
    this.addTileHandler = this.handleAddTile.bind(this);
  }

  @api
  get hash() {
    return this.$hash;
  }
  set hash(hash: string) {
    if (this.$world) {
      const host = this.template.host as HTMLElement;
      host.style.setProperty('--grid-width', `${this.$world.width}`);
      host.style.setProperty('--grid-height', `${this.$world.height}`);
    }
    this.$hash = hash;
  }

  @api
  get world() {
    return this.$world;
  }
  set world(world: WorldModel | null) {
    if (world) {
      const size = this.template.host.getBoundingClientRect();
      const width = world.width * (16 * 4);
      const height = world.height * (16 * 4);
      this.offsetX = Math.floor((size.width / 2) - (width / 2));
      this.offsetY = Math.floor((size.height / 2) - (height / 2));
      const host = this.template.host as HTMLElement;
      const x = Math.floor(this.offsetX % 64);
      const y = Math.floor(this.offsetY % 64);
      host.style.setProperty('--offset-x', `${x}px`);
      host.style.setProperty('--offset-y', `${y}px`);
      host.style.setProperty('--grid-offset-x', `${this.offsetX}px`);
      host.style.setProperty('--grid-offset-y', `${this.offsetY}px`);
      host.style.setProperty('--grid-width', `${world.width}`);
      host.style.setProperty('--grid-height', `${world.height}`);
    }
    this.$world = world;
  }

  offsetX: number = 0;
  offsetY: number = 0;

  connectedCallback() {
    this.template.host.addEventListener('mousedown', this.mouseDownHandler);
    this.template.host.addEventListener('mouseup', this.mouseUpHandler);
    this.template.host.addEventListener('mousemove', this.mouseMoveHandler);
    this.addEventListener('addtile', this.addTileHandler)
  }

  @track isDragging = false;
  mouseX: number = 0;
  mouseY: number = 0;
  handleMouseDown(e: MouseEvent) {
    this.isDragging = true;
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  handleMouseUp(e: MouseEvent) {
    this.isDragging = false;
  }

  handleMouseMove(e: MouseEvent) {
    if (this.isDragging) {
      this.updateOffset(e.clientX - this.mouseX, e.clientY - this.mouseY);
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    }
  }

  updateOffset(deltaX: number, deltaY: number) {
    this.offsetX += deltaX;
    this.offsetY += deltaY;
    const x = Math.floor(this.offsetX % 64);
    const y = Math.floor(this.offsetY % 64);
    const host = this.template.host;
    host.style.setProperty('--offset-x', `${x}px`);
    host.style.setProperty('--offset-y', `${y}px`);
    host.style.setProperty('--grid-offset-x', `${this.offsetX}px`);
    host.style.setProperty('--grid-offset-y', `${this.offsetY}px`);
  }

  handleAddTile(e: CustomEvent<any>) {
    const { minX, minY } = this.$world as WorldModel;
    if (minX - 1 === e.detail.x) {
      this.updateOffset(-64, 0);
    }
    if (minY - 1 === e.detail.y) {
      this.updateOffset(0, -64);
    }
  }

}
