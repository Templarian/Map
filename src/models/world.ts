import Tile from "./tile";

export default class World {
  public id: string = '';
  public name: string = '';
  public description: string = '';
  public author: string = '';
  public tiles: Tile[] = [];

  from(world: World) {
    this.name = world.name;
    this.description = world.description;
    this.author = world.author;
    this.tiles = world.tiles.map(tile => new Tile().from(tile));
    return this;
  }
}