import { buildCustomElementConstructor, register } from 'lwc';
import { registerWireService } from 'wire-service';
import MapApp from 'map/app';

registerWireService(register);

customElements.define('map-app', buildCustomElementConstructor(MapApp));
