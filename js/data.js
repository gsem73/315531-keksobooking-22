// Данные для карты

const TOKYO_CENTER = {
  lat: 35.675,
  lng: 139.75,
};

const getViewCenter = function() {
  return TOKYO_CENTER;
};

const formatCoordinates = function(coordinates) {
  return coordinates.lat.toFixed(5) + ', ' + coordinates.lng.toFixed(5);
};

let similarRealty = [];

const setSimilarRealty = function(json) {
  similarRealty = json;
};

const getSimilarRealty = function(elementCount, filterValue) {

  // Проверка похожего объявления на соответствие критериям фильтрации
  const checkElement = function(element) {
    if (filterValue.get('housing-type') !== 'any') {
      if (filterValue.get('housing-type') !== element.offer.type) {
        return false;
      }
    }
    return true;
  };

  return similarRealty.filter(checkElement).slice(0, elementCount);
}

export {getViewCenter, formatCoordinates, setSimilarRealty, getSimilarRealty};
