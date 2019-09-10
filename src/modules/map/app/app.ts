import { LightningElement, track, wire } from 'lwc';
import { getMap } from 'services/mapService';
import { addToast, addErrorToast, addWarningToast, addLoadingToast, removeToast } from 'services/toastService';
import World from 'models/world';

export default class App extends LightningElement {

    @track tile: any = { complex: 'object' };
    @track tileId: any = null;
    @track world: World | null = null;

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
        this.tileId = 'map';
        this.loadingToastId = addLoadingToast('Loading Map...');
    }

    loadMap2() {
        this.tileId = 'map1';
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
