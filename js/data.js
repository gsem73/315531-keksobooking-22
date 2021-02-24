import {getRandomInteger, getRandomFloat, getRandomElement, getRandomArray} from './utils.js';

const AVATAR_PATH = 'img/avatars/';
const AVATAR_IMAGES = ['user01.png', 'user02.png', 'user03.png', 'user04.png', 'user05.png', 'user06.png', 'user07.png', 'user08.png'];
const MAX_ROOMS = 25;
const MAX_GUESTS = 500;
const MIN_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
};
const MAX_PRICE = 1000000;
const MIN_X = 35.65000;
const MAX_X = 35.70000;
const MIN_Y = 139.70000;
const MAX_Y = 139.80000

const TYPES = ['palace','flat','house','bungalow'];
const CHECK_TIMES = ['12:00','13:00','14:00'];
const AVAILABLE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const AVAILABLE_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg','http://o0.github.io/assets/images/tokyo/hotel2.jpg','http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const TITLES = ['Комфорт для Вас', 'Уголок тишины в центре города', 'Сказочная атмосфера средневекового замка', 'Идеально для двоих'];
const DESCRIPTIONS = ['Функциональная планировка', 'Оригинальный дизайн', 'Отличный ремонт', 'Панорамное остекление'];

let getMinPrice = function(type) {
  return MIN_PRICE[type];
}

let getMaxPrice = function() {
  return MAX_PRICE;
}

export {getMinPrice, getMaxPrice};

// Формирование тестовой информации по объекту недвижимости
let getTestApartment = function() {
  let xPosition = getRandomFloat(MIN_X, MAX_X, 5);
  let yPosition = getRandomFloat(MIN_Y, MAX_Y, 5);
  let apartmentType = getRandomElement(TYPES);
  return {
    author: {
      avatar: AVATAR_PATH + getRandomElement(AVATAR_IMAGES),
    },
    offer: {
      title: getRandomElement(TITLES),
      address: xPosition.toFixed(5) + ', ' + yPosition.toFixed(5),
      price: getRandomFloat(getMinPrice(apartmentType), getMaxPrice(), 2),
      type: apartmentType,
      rooms: getRandomInteger(1, MAX_ROOMS),
      guests: getRandomInteger(1, MAX_GUESTS),
      checkin: getRandomElement(CHECK_TIMES),
      checkout: getRandomElement(CHECK_TIMES),
      features: getRandomArray(AVAILABLE_FEATURES),
      description: getRandomArray(DESCRIPTIONS).join(', '),
      photos: getRandomArray(AVAILABLE_PHOTOS),
    },
    location: {
      x: xPosition,
      y: yPosition,
    },
  };
}

// Формирование списка объектов недвижимости
let getApartments = function(count) {
  let result = [];
  for(let i=0; i < count; i++) {
    result.push(getTestApartment());
  }
  return result;
}

export {getApartments};
