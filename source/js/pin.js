// Обработчики изменения значений фильтров

const DELAY = 500; // время задержки перерисовки маркеров при изменении фильтров

import {refreshMarker} from './map.js'
import {debounce} from './utils.js';

const filterForm = document.querySelector('.map__filters');

filterForm.addEventListener('change', debounce(refreshMarker, DELAY));
