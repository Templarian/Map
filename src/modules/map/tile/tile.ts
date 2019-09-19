import { LightningElement, track, api } from 'lwc';
import TileCls from 'models/tile';

export default class Tile extends LightningElement {
    @track isLoading: boolean = true;

    @api tile: TileCls = new TileCls();
    @api hash: string = '';

    get x() {
        return this.tile.coordinate[0];
    }

    get y() {
        return this.tile.coordinate[1];
    }

    renderedCallback() {
        const [x, y] = this.tile.gridCoordinate || [0, 0];
        const ele = this.template.host as HTMLElement;
        ele.style.setProperty('--column', `${x}`);
        ele.style.setProperty('--row', `${y}`);
    }

    handleClick() {
        console.log(this.tile);
    }

    handleDelete() {
        alert('delete');
        console.log('testing');
    }

    @track openDeleteComment = false;
    handleComment() {
        this.openDeleteComment = true;
    }

    cancelDeleteComment() {
        this.openDeleteComment = false;
    }

    confirmDeleteComment() {
        this.tile.comment = '';
        this.openDeleteComment = false;
    }
}
