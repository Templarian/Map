import { LightningElement, track, api } from 'lwc';

export default class Tile extends LightningElement {
    @track isLoading = true;

    _tile = null;

    @api tileId;

    @api
    get tile() {
        return this._tile;
    }
    set tile(tile){
        console.log(tile.complex);
        this._tile = tile;
    }

    handleClick() {
        console.log('edit');
    }
}
