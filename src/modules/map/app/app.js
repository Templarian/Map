import { LightningElement, track, wire } from 'lwc';
import { getMap } from '../../../services/mapService';
import { addToast, addErrorToast, addWarningToast } from '../../../services/toastService';

export default class App extends LightningElement {

    @track tile = { complex: 'object' };
    @track tileId = 1;

    @wire(getMap, { id: '$tileId' })
    map;

    get data() {
        return JSON.stringify(this.map);
    }

    get error() {
        return this.map ? '' : 'Error loading data: ' + this.map.error.message;
    }

    loadMap() {
        this.tileId += 1;
    }

    loadMap2() {
        this.dispatchEvent(new CustomEvent('addtoast', {
            detail: {
                message: 'Loading...'
            },
            bubbles: true,
            composed: true
        }));
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
