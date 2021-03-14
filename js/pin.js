/* global _:readonly */
// Обработчики изменения значений фильтров

const DELAY = 500; // время задержки перерисовки маркеров при изменении фильтров

import {refreshMarker} from './map.js'

const filterForm = document.querySelector('.map__filters');

filterForm.addEventListener('change', _.debounce(refreshMarker, DELAY) );
