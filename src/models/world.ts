import Tile from "./tile";
import Layer from "./layer";
import Collision from "./collision";

export default class World {
  public id: string = '';
  public name: string = '';
  public description: string = '';
  public author: string = '';
  public tiles: Tile[] = [];
  public tileCount: number = 0;

  public from(world: World) {
    this.name = world.name;
    this.description = world.description;
    this.author = world.author;
    if (world.tiles) {
      this.tiles = world.tiles.map(tile => new Tile().from(tile));
      this.iterateTiles(this.tiles[0], (tile: Tile, [x, y]: [number, number]) => {
        tile.setCoordinate(x, y);
      });
    }
    this.tileCount = world.tileCount;
    return this;
  }

  private getTile(x: number, y: number): Tile | null {
    return this.tiles.find(tile => tile.coordinate![0] === x && tile.coordinate![1] === y) || null;
  }

  private getSidesByCoordinate(x: number, y: number): (Tile | null)[] {
    return [
      this.getTile(x, y - 1),
      this.getTile(x + 1, y),
      this.getTile(x, y + 1),
      this.getTile(x - 1, y)
    ];
  }

  private getSideCoordinate([x, y]: [number, number], index: number): [number, number] {
    switch (index) {
      case 0:
        return [x, y - 1];
      case 1:
        return [x + 1, y];
      case 2:
        return [x, y + 1];
      case 3:
        return [x - 1, y];
    }
    throw new Error('Invalid side');
  };

  getSides(tile: Tile): (Tile | null)[] {
    return [
      this.tiles.find(t => t.id[0] === tile.id[1]) || null,
      this.tiles.find(t => t.id[0] === tile.id[2]) || null,
      this.tiles.find(t => t.id[0] === tile.id[3]) || null,
      this.tiles.find(t => t.id[0] === tile.id[4]) || null
    ];
  }

  private uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public addTile(x: number, y: number, layers: Layer[]) {
    var sides = this.getSidesByCoordinate(x, y);
    var uuid = this.uuidv4();
    const tile = new Tile();
    const s = [...sides.map(s => s ? s.id[0] : null)];
    tile.id = [uuid, s[0], s[1], s[2], s[3]];
    tile.layers = layers || [new Layer().from('paper-tan'), new Layer().from('tile-lines-1')];
    this.tiles.push(tile);
    if (sides[0]) { sides[0].id[3] = uuid; }
    if (sides[1]) { sides[1].id[4] = uuid; }
    if (sides[2]) { sides[2].id[1] = uuid; }
    if (sides[3]) { sides[3].id[2] = uuid; }
  }

  public removeTile(tile: Tile) {
    var sides = this.getSides(tile);
    this.tiles.splice(this.tiles.findIndex(x => x.id[0] === tile.id[0]), 1);
    if (sides[0]) { sides[0].id[3] = null; }
    if (sides[1]) { sides[1].id[4] = null; }
    if (sides[2]) { sides[2].id[1] = null; }
    if (sides[3]) { sides[3].id[2] = null; }
  }

  public canRemove(tile: Tile) {
    if (this.tiles.length === 1) {
      return false;
    }
    var sides = this.getSides(tile);
    var counts = sides.map(side => {
      if (side) {
        var i = 0;
        this.iterateTiles(side, () => i++, [tile]);
        return i;
      }
      return null;
    }).filter(c => c !== null);
    return counts.every(c => c === this.tiles.length - 1);
  }

  public iterateTiles(startTile: Tile, callback: Function, ignoreTiles: Tile[] = []) {
    const iterate = (tiles: Tile[], tile: Tile, [x, y]: [number, number]) => {
      tiles.splice(tiles.findIndex(t => t.id[0] === tile.id[0]), 1)[0];
      callback(tile, [x, y]);
      var [, top, right, bottom, left] = tile.id;
      [top, right, bottom, left].forEach((side, i) => {
        if (side !== null) {
          var nextTile = tiles.find(t => t.id[0] === side);
          if (nextTile) {
            const coordinate = this.getSideCoordinate([x, y], i);
            iterate(tiles, nextTile, coordinate);
          }
        }
      });
    }
    var tiles = [...this.tiles];
    if (ignoreTiles) {
      var ignoreIds = ignoreTiles.map(t => t.id[0]);
      tiles = tiles.filter(t => !ignoreIds.includes(t.id[0]));
    }
    iterate(tiles, startTile, [0, 0]);
  }

  public getCollision(tile: Tile, index: number) {
    var c = tile.collision;
    var sides = [
      c === 1 || c === 3 || c === 5 || c === 7 || c === 9 || c === 11 || c === 13 || c === 15 ? 1 : 0,
      c === 2 || c === 3 || c === 6 || c === 7 || c === 10 || c === 11 || c === 14 || c === 15 ? 1 : 0,
      c === 4 || c === 5 || c === 6 || c === 7 || c === 12 || c === 13 || c === 14 || c === 15 ? 1 : 0,
      c === 8 || c === 9 || c === 10 || c === 11 || c === 12 || c === 13 || c === 14 || c === 15 ? 1 : 0
    ];
    sides[index] = sides[index] === 0 ? 1 : 0;
    return (sides[0] * 1) + (sides[1] * 2) + (sides[2] * 4) + (sides[3] * 8);
  }
}