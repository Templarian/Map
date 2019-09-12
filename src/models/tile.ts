import Layer from "./layer";
import Collision from "./collision";

export default class Tile {
    public id: [
        (string | null),
        (string | null),
        (string | null),
        (string | null),
        (string | null)
    ] = [null, null, null, null, null];
    public comment: string | null = null;
    public collision: Collision = Collision.None;
    public layers: Layer[] = [];

    private $coordinate: [number, number] | null = null;
    public get coordinate() {
      return this.$coordinate;
    }

    public setCoordinate(x: number, y: number) {
        this.$coordinate = [x, y];
    }

    get tileId() {
        return this.id[0];
    }

    get topId() {
        return this.id[1];
    }

    get rightId() {
        return this.id[2];
    }

    get bottomId() {
        return this.id[3];
    }

    get leftId() {
        return this.id[4];
    }

    from(tile: Tile) {
        this.id = tile.id;
        this.comment = tile.comment;
        this.layers = tile.layers.map(layer => new Layer().from(layer));
        return this;
    }
}