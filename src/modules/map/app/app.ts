import { LightningElement, track, wire } from 'lwc';
import { getMap } from 'services/mapService';
import { addToast, addErrorToast, addWarningToast, addLoadingToast, removeToast } from 'services/toastService';
import World from 'models/world';
//import { mdiAccount } from '@mdi/js';

export default class App extends LightningElement {

    @track tile: any = { complex: 'object' };
    @track tileId: any = null;
    @track world: World | null = null;
    @track mdiAccount: string = 'M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z';

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
