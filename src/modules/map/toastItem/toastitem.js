import { LightningElement, api } from 'lwc';
import { removeToast } from '../../../services/toastService';

export default class ToastItem extends LightningElement {

    @api
    toast;

    get computedClass() {
        var cls = [`variant-${this.toast.variant}`];
        if (this.toast.seconds > 0) {
            cls.push(`seconds-${this.toast.seconds}`);
        }
        return cls.join(' ');
    }

    get dismissable() {
        return this.toast.dismissable;
    }

    handleClick(e) {
        removeToast(e.target.dataset.id);
    }

}
