/* global L:readonly */

// Создание карты

const MAX_PIN = 10; // максимальное количество меток похожих объявлений

import {getViewCenter, setSimilarRealty, getSimilarRealty} from './data.js';
import {enableMainForm, setCoordinates} from './form.js';
import {enableFilterForm} from './filter.js';
import {recieveData} from './server.js';
import {createBalloonLayout} from './layout.js';

const map = L.map('map-canvas');

// Добавляем на карту метки похожих объявлений

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [21, 52],
});

const showPin = function(realtyList) {

  for (let i = 0; i < realtyList.length; i++) {

    let pin = L.marker(
      realtyList[i].location,
      {
        icon: pinIcon,
      },
    );
    pin
      .addTo(map)
      .bindPopup(
        createBalloonLayout(realtyList[i]),
        {
          keepInView: true,
        },
      );
  }
};

// callback-функции для загрузки похожих объявлений

const onReciveSuccess = function(json) {
  setSimilarRealty(json);
  enableFilterForm();
  showPin(getSimilarRealty(MAX_PIN));
};

const onReciveError = function(error) {
  alert('Ошибка при загрузке списка похожих объявлений: ' + error.message)
};


const onMapLoad = function() {
  enableMainForm();
  recieveData(onReciveSuccess,onReciveError);
};

map.on('load', onMapLoad);
map.setView(getViewCenter(), 10);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Метка выбора адреса

const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [21, 52],
});

const mainMarker = L.marker(
  getViewCenter(),
  {
    draggable: true,
    icon: mainIcon,
  },
);

const onMainMarkerMoveend = function(evt) {
  setCoordinates(evt.target.getLatLng());
};

mainMarker.on('moveend', onMainMarkerMoveend);
mainMarker.addTo(map);

const resetMap = function() {
  map.setView(getViewCenter(), 10);
  mainMarker.setLatLng(getViewCenter());
};

export{resetMap};
