import { LightningElement, track, api } from 'lwc';

export default class Tile extends LightningElement {
    @track isLoading: boolean = true;

    _tile: any = null;

    @api tileId: any;

    @api
    get tile() {
        return this._tile;
    }
    set tile(tile){
        console.log(tile);
        this._tile = tile;
    }

    handleClick() {
        console.log('edit');
    }
}
