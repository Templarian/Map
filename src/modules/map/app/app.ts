import { LightningElement, track, wire } from 'lwc';
import { getMap } from 'services/mapService';
import { addToast, addErrorToast, addWarningToast, addLoadingToast, removeToast } from 'services/toastService';
import World from 'models/world';
import { mdiAccount, mdiMessageText, mdiScript } from '@mdi/js';

export default class App extends LightningElement {

  @track tile: any = { complex: 'object' };
  @track tileId: any = null;
  @track tileCount: number = 0;
  @track world: World = new World();
  @track mdiAccount: string = mdiAccount;
  @track mdiMessageText: string = mdiMessageText;
  @track mdiScript: string = mdiScript;

  @wire(getMap, { id: '$tileId' })
  function({ error, data }: any) {
    if (data) {
      this.world = new World().from(data);
      console.log(this.world.addTiles);
      removeToast(this.loadingToastId);
    }
    if (error) {
      this.world = new World();
      this.tileId = null;
      addErrorToast('Failed to load map!', 5000);
      removeToast(this.loadingToastId);
    }
  }

  connectedCallback() {
    this.addEventListener('addtile', this.addTile.bind<any>(this));
  }

  addTile(e: CustomEvent) {
    const { x, y } = e.detail;
    this.world!.addTile(x, y, null);
    this.tileCount = this.world!.tileCount;
  }

  get data() {
    return JSON.stringify(this.world);
  }

  loadingToastId: any;

  loadMap() {
    this.tileId = 'world';
    this.loadingToastId = addLoadingToast('Loading Map...');
  }

  loadMap2() {
    this.tileId = 'world1';
    this.loadingToastId = addLoadingToast('Loading Map...');
  }

  fireToast() {
    addToast('Toast Message');
  }

  fireToast3() {
    addToast('Toast Message 3 seconds', 3);
  }


  fireErrorToast() {
    addErrorToast('Toast Error Message');
  }

  fireWarningToast() {
    addWarningToast('Toast Warning Message');
  }

}
