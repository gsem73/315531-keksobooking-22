import {getMinPrice, getMaxPrice} from './data.js';

const typeRealty = document.querySelector('#type');

const priceRealty = document.querySelector('#price');
priceRealty.setAttribute('min', 0);
priceRealty.setAttribute('max', getMaxPrice());
priceRealty.setAttribute('required', '');

const onTypeRealtyChange = function(evt) {
  let minPrice = getMinPrice(evt.target.value);
  priceRealty.setAttribute('min', minPrice);
  priceRealty.setAttribute('placeholder', minPrice.toFixed());
}

typeRealty.addEventListener('change', onTypeRealtyChange);

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const onTimeInChange = function(evt) {
  timeOut.value = evt.target.value;
}

const onTimeOutChange = function(evt) {
  timeIn.value = evt.target.value;
}

timeIn.addEventListener('change', onTimeInChange);
timeOut.addEventListener('change', onTimeOutChange);

