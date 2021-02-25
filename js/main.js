import {getApartments} from './data.js';
import {createApartmentNodes} from './layout.js';
import {} from './form.js';

let apartments = getApartments(10);
let apartmentNodes = createApartmentNodes(apartments);

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(apartmentNodes.children[0]);
