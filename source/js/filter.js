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

const getFilterValue = function() {

  const result = {};
  const formData = new FormData(filterForm);

  result.housingType = formData.get('housing-type');
  result.housingPrice = formData.get('housing-price');
  result.housingRooms = formData.get('housing-rooms');
  result.housingGuests = formData.get('housing-guests');
  result.features = formData.getAll('features');

  return result;

}

export{disableFilterForm, enableFilterForm, resetFilterForm, getFilterValue};
