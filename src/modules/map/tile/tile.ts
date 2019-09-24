import { LightningElement, track, api } from 'lwc';
import TileCls from 'models/tile';
import { addToast } from 'services/toastService';
import Layer from 'models/layer';
import {
    mdiDelete,
    mdiPencil,
    mdiCommentRemove,
    mdiCommentPlus,
    mdiBorderAll,
    mdiBorderInside,
    mdiStarOutline
} from '@mdi/js';

export default class Tile extends LightningElement {

    @track isLoading: boolean = true;
    @track mdiCommentRemove: string = mdiCommentRemove;
    @track mdiDelete: string = mdiDelete;
    @track mdiPencil: string = mdiPencil;
    @track mdiCommentPlus: string = mdiCommentPlus;
    @track mdiBorderAll: string = mdiBorderAll;
    @track mdiBorderInside: string = mdiBorderInside;
    @track mdiStarOutline: string = mdiStarOutline;

    @api tile: TileCls = new TileCls();
    @api hash: string = '';

    get x() {
        return this.tile.coordinate[0];
    }

    get y() {
        return this.tile.coordinate[1];
    }

    get removable() {
        return this.tile.removable;
    }

    get computedClass() {
        return 'tile';
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
        this.dispatchEvent(new CustomEvent('deletetile', {
            detail: {
                tile: this.tile
            },
            bubbles: true,
            composed: true
        }));
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
        addToast('Deleted Comment', 3);
    }

    tileWallHandler(e: MouseEvent) {
        const ele = e.currentTarget as HTMLElement;
        const layer = new Layer();
        if (this.insideActive) {
            layer.id = `wall-inner-${ele.dataset.wall}-1`;
            layer.file = `wall-inner-${ele.dataset.wall}-1`;
        } else {
            layer.id = `wall-outer-${ele.dataset.wall}-1`;
            layer.file = `wall-outer-${ele.dataset.wall}-1`;
        }
        this.tile.layers.push(layer);
        // call update
        this.dispatchEvent(new CustomEvent('updatetile', {}));
    }

    @track insideActive: boolean = true;
    handleToggleInside(e: MouseEvent) {
        this.insideActive = true;
        this.outsideActive = false;
        this.decalActive = false;
        e.stopPropagation();
    }

    @track outsideActive: boolean = false;
    handleToggleOutside(e: MouseEvent) {
        this.insideActive = false;
        this.outsideActive = true;
        this.decalActive = false;
        e.stopPropagation();
    }

    @track decalActive: boolean = false;
    handleToggleDecal(e: MouseEvent) {
        this.insideActive = false;
        this.outsideActive = false;
        this.decalActive = true;
        e.stopPropagation();
    }

    @track modalOpen: boolean = false;
    handleEditComment(e: MouseEvent) {
        this.modalOpen = true;
    }

    updateComment(e: any) {
        console.log(e.detail);
    }

    submitComment(e: CustomEvent) {
        const { inputs } = e.detail;
        this.tile.comment = inputs.find((input: any) => input.name === 'comment').value;
        this.modalOpen = false;
    }
}