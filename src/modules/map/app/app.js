import { LightningElement, track, wire } from 'lwc';
import { getMap } from '../../../services/mapService';
import { addToast, addErrorToast, addWarningToast, addLoadingToast, removeToast, removeAllToasts } from '../../../services/toastService';

export default class App extends LightningElement {

    @track tile = { complex: 'object' };
    @track tileId = null;
    @track map = null;

    @wire(getMap, { id: '$tileId' })
    function({ error, data }) {
        if (data) {
            this.map = data;
            removeToast(this.loadingToastId);
        }
        if (error) {
            this.map = null;
            this.tileId = null;
            addErrorToast('Failed to load map!', 5000);
            removeToast(this.loadingToastId);
        }
    }

    get data() {
        return JSON.stringify(this.map);
    }

    loadingToastId;

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
