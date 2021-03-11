// Отправка данных главной формы

import {resetMainForm} from './form.js';
import {resetFilterForm} from './filter.js';
import {resetMap} from './map.js';
import {showSuccessPopup} from './success.js';
import {showErrorPopup} from './error.js'
import {sendData} from './server.js'

const mainForm = document.querySelector('.ad-form');

const onMainFormReset = function() {
  resetFilterForm();
  resetMap();
};

// callback функции
const onSuccess = function() {
  resetMainForm();
  resetFilterForm();
  resetMap();
  showSuccessPopup();
};

const onFail = function() {
  showErrorPopup();
};

// Отправка формы
const onMainFormSubmit = function(evt) {
  evt.preventDefault();
  sendData(onSuccess, onFail, new FormData(evt.target));
};

mainForm.addEventListener('submit', onMainFormSubmit);
mainForm.addEventListener('reset', onMainFormReset);
