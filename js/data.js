// Данные для карты

const TOKYO_CENTER = {
  lat: 35.675,
  lng: 139.75,
};

const PriceRange = {
  low: {
    minValue: 0,
    maxValue: 10000,
  },
  middle: {
    minValue: 10000,
    maxValue: 50000,
  },
  high: {
    minValue: 50000,
    maxValue: 1000000,
  },
}

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

    if (filterValue.housingType !== 'any') {
      if (filterValue.housingType !== element.offer.type) {
        return false;
      }
    }
    if (filterValue.housingPrice !== 'any') {
      const minPrice = PriceRange[filterValue.housingPrice].minValue;
      const maxPrice = PriceRange[filterValue.housingPrice].maxValue;
      if ((Number(element.offer.price) <= minPrice) || (Number(element.offer.price) > maxPrice)) {
        return false;
      }
    }
    if (filterValue.housingRooms !== 'any') {
      if (Number(filterValue.housingRooms) !== element.offer.rooms) {
        return false;
      }
    }
    if (filterValue.housingGuests !== 'any') {
      if (Number(filterValue.housingGuests) !== element.offer.guests) {
        return false;
      }
    }
    for (let i = 0; i < filterValue.features.length; i++) {
      if (!element.offer.features.includes(filterValue.features[i])) {
        return false;
      }
    }
    return true;
  };

  return similarRealty.filter(checkElement).slice(0, elementCount);
}

export {getViewCenter, formatCoordinates, setSimilarRealty, getSimilarRealty};
