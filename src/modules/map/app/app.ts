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
    @track mdiScript: string = 'M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18H5L14.2,18C14.6,19.2 15.7,20 17,20H17.8M19,2H8C6.3,2 5,3.3 5,5V16H16V17C16,17.6 16.4,18 17,18H18V5C18,4.4 18.4,4 19,4C19.6,4 20,4.4 20,5V6H22V5C22,3.3 20.7,2 19,2Z';

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
