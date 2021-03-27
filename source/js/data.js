// Данные для карты

const TOKYO_CENTER = {
  lat: 35.675,
  lng: 139.75,
};

const priceRange = {
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
    maxValue: Number.MAX_VALUE,
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

// Функция возвращает true, если каждый элемент массива subArray есть в baseArray
const isSubArray = function(subArray, baseArray) {
  return subArray.every(function(item) {
    return baseArray.includes(item);
  });
};

const getSimilarRealty = function(elementCount, filterValue) {

  // Проверка похожего объявления на соответствие критериям фильтрации
  const checkElement = function(element) {

    return (filterValue.housingType === 'any' || filterValue.housingType === element.offer.type) &&
      (filterValue.housingPrice === 'any' ||
        (Number(element.offer.price) >= priceRange[filterValue.housingPrice].minValue &&
          Number(element.offer.price) < priceRange[filterValue.housingPrice].maxValue))  &&
      (filterValue.housingRooms === 'any' || Number(filterValue.housingRooms) === element.offer.rooms) &&
      (filterValue.housingGuests === 'any' || Number(filterValue.housingGuests) === element.offer.guests) &&
      isSubArray(filterValue.features, element.offer.features);

  };

  return similarRealty.filter(checkElement).slice(0, elementCount);
}

export {getViewCenter, formatCoordinates, setSimilarRealty, getSimilarRealty};
