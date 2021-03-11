// Обработчики изменения значений фильтров

import {refreshMarker} from './map.js'

const filterForm = document.querySelector('.map__filters');

filterForm.addEventListener('change', refreshMarker);
