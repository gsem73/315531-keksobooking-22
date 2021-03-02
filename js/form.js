/* global L:readonly */
import {getMinPrice, getApartments} from './data.js';
import {createApartmentNodes} from './layout.js';

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
map.setView(TOKYO_CENTER, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Главная метка выбора адреса

const address = document.querySelector('#address');
address.setAttribute('readonly', '');
address.value = formatLatLng(TOKYO_CENTER);

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

let apartments = getApartments(10);
let apartmentNodes = createApartmentNodes(apartments);

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [21, 52],
});

for (let i = 0; i < apartments.length; i++) {

  let coordinates = {};
  coordinates.lat = apartments[i].location.x;
  coordinates.lng = apartments[i].location.y;

  let pin = L.marker(
    coordinates,
    {
      icon: pinIcon,
    },
  );
  pin
    .addTo(map)
    .bindPopup(
      apartmentNodes.children[i],
      {
        keepInView: true,
      },
    );
}

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
