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

    if (filterValue.get('housing-type') !== 'any') {
      if (filterValue.get('housing-type') !== element.offer.type) {
        return false;
      }
    }
    if (filterValue.get('housing-price') !== 'any') {
      const minPrice = PriceRange[filterValue.get('housing-price')].minValue;
      const maxPrice = PriceRange[filterValue.get('housing-price')].maxValue;
      if ((Number(element.offer.price) <= minPrice) || (Number(element.offer.price) > maxPrice)) {
        return false;
      }
    }
    if (filterValue.get('housing-rooms') !== 'any') {
      if (Number(filterValue.get('housing-rooms')) !== element.offer.rooms) {
        return false;
      }
    }
    if (filterValue.get('housing-guests') !== 'any') {
      if (Number(filterValue.get('housing-guests')) !== element.offer.guests) {
        return false;
      }
    }
    const selectedFeatures = filterValue.getAll('features');
    for (let i = 0; i < selectedFeatures.length; i++) {
      if (!element.offer.features.includes(selectedFeatures[i])) {
        return false;
      }
    }
    return true;
  };

  return similarRealty.filter(checkElement).slice(0, elementCount);
}

export {getViewCenter, formatCoordinates, setSimilarRealty, getSimilarRealty};
