import { LightningElement, wire } from 'lwc';
import { getToasts } from '../../../services/toastService';

export default class Toast extends LightningElement {

    @wire(getToasts)
    toastWire;

    get toasts() {
        return this.toastWire.data;
    }

}
