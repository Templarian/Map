import { LightningElement, track, wire } from 'lwc';
import { getMap } from 'services/mapService';
import { addToast, addErrorToast, addWarningToast, addLoadingToast, removeToast } from 'services/toastService';
import World from 'models/world';
//import { mdiAccount } from '@mdi/js';

export default class App extends LightningElement {

    @track tile: any = { complex: 'object' };
    @track tileId: any = null;
    @track world: World | null = null;
    @track mdiMessageText: string = 'M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9H18V11H6M14,14H6V12H14M18,8H6V6H18';

    @wire(getMap, { id: '$tileId' })
    function({ error, data }: any) {
        if (data) {
            this.world = new World().from(data);
            removeToast(this.loadingToastId);
        }
        if (error) {
            this.world = null;
            this.tileId = null;
            addErrorToast('Failed to load map!', 5000);
            removeToast(this.loadingToastId);
        }
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
