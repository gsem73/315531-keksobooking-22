// Функции для работы с главной формой

import {disableControl, enableControl} from './utils.js';
import {getViewCenter, formatCoordinates} from './data.js';

const mainForm = document.querySelector('.ad-form');
const disableClass = 'ad-form--disabled';

const disableMainForm = function() {
  disableControl(mainForm);
  mainForm.classList.add(disableClass);
}

const enableMainForm = function() {
  enableControl(mainForm);
  mainForm.classList.remove(disableClass);
}

disableMainForm();

const address = document.querySelector('#address');

const setCoordinates = function(coordinates) {
  address.value = formatCoordinates(coordinates);
}

address.setAttribute('value', formatCoordinates(getViewCenter()));

const resetMainForm = function() {
  mainForm.reset();
}

export{disableMainForm, enableMainForm, setCoordinates, resetMainForm};
