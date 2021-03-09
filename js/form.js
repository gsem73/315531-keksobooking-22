/* global L:readonly */
import {getMinPrice} from './data.js';
import {createBalloonLayout} from './layout.js';
import {getSimilarRealty, sendData} from './server.js';

const TOKYO_CENTER = {
  lat: 35.675,
  lng: 139.75,
}

const formatLatLng = function(coordinates) {
  return coordinates.lat.toFixed(5) + ', ' + coordinates.lng.toFixed(5);
}

// Изменение состояния форм

const BookingForm = class {
  constructor(formClass, switchClass) {

    this.form = document.querySelector('.' + formClass);
    this.elements = this.form.querySelectorAll('input, select, button, fieldset, textarea');
    this.switchClass = switchClass;

    this.disable = function () {
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].setAttribute('disabled', '');
      }
      this.form.classList.add(this.switchClass);
    };

    this.enable = function () {
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].removeAttribute('disabled');
      }
      this.form.classList.remove(this.switchClass);
    };
  }
}

const ad = new BookingForm('ad-form', 'ad-form--disabled');
ad.disable();

const filter = new BookingForm('map__filters', 'map__filters--disabled');
filter.disable();

// Cоздание карты

const onMapLoad = function() {
  ad.enable();
  filter.enable();
}

const map = L.map('map-canvas');
map.on('load', onMapLoad);
map.setView(TOKYO_CENTER, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Главная метка выбора адреса

const address = document.querySelector('#address');
address.setAttribute('readonly', '');
address.setAttribute('value', formatLatLng(TOKYO_CENTER));

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [21, 52],
});

const marker = L.marker(
  TOKYO_CENTER,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const onMarkerMoveend = function(evt) {
  address.value = formatLatLng(evt.target.getLatLng());
}

marker.on('moveend', onMarkerMoveend);
marker.addTo(map);

// Метки похожих объявлений

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [21, 52],
});

const addBalloons = function(apartments) {

  for (let i = 0; i < apartments.length; i++) {

    let pin = L.marker(
      apartments[i].location,
      {
        icon: pinIcon,
      },
    );
    pin
      .addTo(map)
      .bindPopup(
        createBalloonLayout(apartments[i]),
        {
          keepInView: true,
        },
      );
  }
}

const showError = function(error) {
  alert('Ошибка при загрузке списка похожих объявлений: ' + error.message)
}

const similarRealty = getSimilarRealty(addBalloons, showError);

similarRealty();

// Валидация формы

const typeRealty = document.querySelector('#type');

const priceRealty = document.querySelector('#price');

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


// Расширенная валидация поля "Количество мест"

const capacity = document.querySelector('#capacity');
const roomNumber = document.querySelector('#room_number');

// Правила проверки количества гостей в зависимостии от выбранного количества комнат
const СapacityRules = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

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

// Сброс карты и формы фильтров
const onPageReset = function() {
  filter.form.reset();
  map.setView(TOKYO_CENTER, 10);
  marker.setLatLng(TOKYO_CENTER);
}

const main = document.querySelector('main');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

// Закрытие модального окна success
const onSuccessClick = function() {
  const popup = document.querySelector('.success');
  main.removeChild(popup);
  document.removeEventListener('keydown', onSuccessKeyDown);
}

const onSuccessKeyDown = function(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.success');
    main.removeChild(popup);
    document.removeEventListener('keydown', onSuccessKeyDown);
  }
}

// Закрытие модального окна error
const onErrorClick = function() {
  const popup = document.querySelector('.error');
  main.removeChild(popup);
  document.removeEventListener('keydown', onErrorKeyDown);
}

const onErrorKeyDown = function(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.error');
    main.removeChild(popup);
    document.removeEventListener('keydown', onErrorKeyDown);
  }
}

// Обработка результатов отправки формы
const onSuccess = function() {
  ad.form.reset();
  onPageReset();
  const successMessagePopup = successMessageTemplate.cloneNode(true);
  const successPopup = main.appendChild(successMessagePopup);
  successPopup.addEventListener('click', onSuccessClick);
  document.addEventListener('keydown', onSuccessKeyDown);
}

const onFail = function() {
  const errorMessagePopup = errorMessageTemplate.cloneNode(true);
  const errorPopup = main.appendChild(errorMessagePopup);
  errorPopup.addEventListener('click', onErrorClick);
  document.addEventListener('keydown', onErrorKeyDown);
}

// Отправка формы
const onAdFormSubmit = function(evt) {
  evt.preventDefault();
  sendData(onSuccess, onFail, new FormData(evt.target));
}

ad.form.addEventListener('submit', onAdFormSubmit);
ad.form.addEventListener('reset', onPageReset);
