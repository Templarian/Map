import { LightningElement, api } from 'lwc';

export default class Tile extends LightningElement {

  _path: string = '';

  @api
  get path() {
    return this._path;
  }
  set path(path: string) {
    this._path = path;
  }

}
