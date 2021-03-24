// Валидация главной формы

// Минимальная цена в зависимости от типа недвижимости
const MinRealtyPrice = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
};

// Допустимое количества гостей в зависимостии от выбранного количества комнат
const СapacityRules = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const typeEdit = document.querySelector('#type');
const priceEdit = document.querySelector('#price');

const getMinPrice = function(typeRealty) {
  return MinRealtyPrice[typeRealty].toFixed();
}

const ontypeEditChange = function(evt) {
  priceEdit.setAttribute('min', getMinPrice(evt.target.value));
  priceEdit.setAttribute('placeholder', getMinPrice(evt.target.value));
}

priceEdit.setAttribute('min', getMinPrice(typeEdit.value));
priceEdit.setAttribute('placeholder', getMinPrice(typeEdit.value));

typeEdit.addEventListener('change', ontypeEditChange);

// Время заезда и выезда

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

// Проверка количества гостей в зависимостии от выбранного количества комнат

const capacity = document.querySelector('#capacity');
const roomNumber = document.querySelector('#room_number');

const validateRoomNumber = function() {
  if (СapacityRules[roomNumber.value].includes(capacity.value)) {
    capacity.setCustomValidity('');
  } else {
    capacity.setCustomValidity('Возможные значения при выбанном количестве комнат: ' + СapacityRules[roomNumber.value]);
  }
};

// Проверка начального состояния формы
validateRoomNumber();

const onCapacityChange = function() {
  validateRoomNumber();
};

const onRoomNumberChange = function() {
  validateRoomNumber();
};

capacity.addEventListener('change', onCapacityChange);
roomNumber.addEventListener('change', onRoomNumberChange);
