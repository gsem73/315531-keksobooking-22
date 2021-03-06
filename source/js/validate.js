// Валидация главной формы

// Минимальная цена в зависимости от типа недвижимости
const minRealtyPrice = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
};

// Допустимое количества гостей в зависимостии от выбранного количества комнат
const capacityRules = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const typeEdit = document.querySelector('#type');
const priceEdit = document.querySelector('#price');

const getMinPrice = function(typeRealty) {
  return minRealtyPrice[typeRealty].toFixed();
}

const ontypeEditChange = function(evt) {
  priceEdit.min = getMinPrice(evt.target.value);
  priceEdit.placeholder = getMinPrice(evt.target.value);
}

priceEdit.min = getMinPrice(typeEdit.value);
priceEdit.placeholder = getMinPrice(typeEdit.value);

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
  if (capacityRules[roomNumber.value].includes(capacity.value)) {
    capacity.setCustomValidity('');
  } else {
    capacity.setCustomValidity('Возможные значения при выбанном количестве комнат: ' + capacityRules[roomNumber.value]);
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
