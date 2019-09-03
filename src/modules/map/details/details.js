import { LightningElement, api } from 'lwc';

export default class Details extends LightningElement {
    @api name = null;
    @api author = null;
}
