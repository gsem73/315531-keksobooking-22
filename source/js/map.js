/* global L:readonly */

// Создание карты

const MAX_PIN = 10; // максимальное количество меток похожих объявлений
const ICON_SIZE = 52;
const MAP_SCALE = 10;

import {getViewCenter, setSimilarRealty, getSimilarRealty} from './data.js';
import {enableMainForm, setCoordinates} from './form.js';
import {enableFilterForm, getFilterValue} from './filter.js';
import {recieveData} from './server.js';
import {createBalloonLayout} from './layout.js';

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

// Добавляем на карту метки похожих объявлений

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [Math.floor(ICON_SIZE / 2), ICON_SIZE],
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
      .addTo(markerGroup)
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
  showPin(getSimilarRealty(MAX_PIN, getFilterValue()));
};

const onReciveError = function(error) {
  alert('Ошибка при загрузке списка похожих объявлений: ' + error.message)
};


const onMapLoad = function() {
  enableMainForm();
  recieveData(onReciveSuccess,onReciveError);
};

map.on('load', onMapLoad);
map.setView(getViewCenter(), MAP_SCALE);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Метка выбора адреса

const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [ICON_SIZE, ICON_SIZE],
  iconAnchor: [Math.floor(ICON_SIZE / 2), ICON_SIZE],
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

const refreshMarker = function() {
  map.closePopup();
  markerGroup.eachLayer(function(marker){
    marker.remove();
  });
  showPin(getSimilarRealty(MAX_PIN, getFilterValue()));
};

const resetMap = function() {
  map.setView(getViewCenter(), MAP_SCALE);
  mainMarker.setLatLng(getViewCenter());
  refreshMarker()
};

export{resetMap, refreshMarker};
