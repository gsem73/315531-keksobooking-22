// Функции для работы с формой фильтров

import {disableControl, enableControl} from './utils.js';

const filterForm = document.querySelector('.map__filters');
const disableClass = 'map__filters--disabled';

const disableFilterForm = function() {
  disableControl(filterForm);
  filterForm.classList.add(disableClass);
}

const enableFilterForm = function() {
  enableControl(filterForm);
  filterForm.classList.remove(disableClass);
}

disableFilterForm();

const resetFilterForm = function() {
  filterForm.reset();
}

export{disableFilterForm, enableFilterForm, resetFilterForm};
