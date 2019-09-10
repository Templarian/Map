import { buildCustomElementConstructor, register } from 'lwc';
import { registerWireService } from '@lwc/wire-service';
import MapApp from 'map/app';

registerWireService(register);

customElements.define('map-app', buildCustomElementConstructor(MapApp));
