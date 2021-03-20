// Обработчики изменения значений фильтров

const DELAY = 500; // время задержки перерисовки маркеров при изменении фильтров

import {refreshMarker} from './map.js'

const filterForm = document.querySelector('.map__filters');

let timeout;

const onFilterFormChange = function() {
  clearTimeout(timeout);
  timeout = setTimeout(refreshMarker, DELAY)
}

filterForm.addEventListener('change', onFilterFormChange);
