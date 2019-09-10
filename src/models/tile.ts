export default class Tile {
    public id: [
        (string | null),
        (string | null),
        (string | null),
        (string | null),
        (string | null)
    ] = [null, null, null, null, null];
    public comment: string = '';
    public layers: string[] = [];

    from(tile: Tile) {
        this.id = tile.id;
        this.comment = tile.comment;
        this.layers = tile.layers;
        return this;
    }
}