import { LightningElement, track, api } from 'lwc';
import TileCls from 'models/tile';

export default class Tile extends LightningElement {
    @track isLoading: boolean = true;

    @api tile: TileCls = new TileCls();

    renderedCallback() {
        const [x, y] = this.tile.coordinate || [0, 0];
        const ele = this.template.host as HTMLElement;
        ele.style.left = `${4 * x}rem`;
        ele.style.top = `${4 * y}rem`;
    }

    handleClick() {
        console.log(this.tile);
    }

    handleDelete() {
        alert('delete');
        console.log('testing');
    }
}
