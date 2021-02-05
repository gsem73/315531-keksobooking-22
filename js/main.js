'use strict'

const AVATAR_COUNT = 8;
const MAX_ROOMS = 25;
const MAX_GUESTS = 500;
const MIN_PRICE = 1000;
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

// Функция возвращает случайное целое число в диапазоне от min до max включительно
// Использованы материалы с learn.javascript.ru
let getRandomInteger = function(min, max) {
  if (min < 0) {
    return NaN; // Диапазон может быть только положительным
  }
  if (min > max) {
    return NaN; // Верхняя граница диапазона должна быть больше или равна нижней
  }
  if (!(Number.isInteger(min) && Number.isInteger(max))) {
    return NaN; // Границы диапазона - целые числа
  }
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// Функция возвращает случайное число с плавающей точкой из заданного диапазона включительно
let getRandomFloat = function(min, max, precision) {
  if (precision < 0) {
    return NaN
  }
  if (!Number.isInteger(precision)) {
    return NaN
  }
  let coefficient = (10**precision);
  let minInteger = Math.floor(min * coefficient);
  let maxInteger = Math.floor(max * coefficient);
  let randomInteger = getRandomInteger(minInteger, maxInteger);
  return randomInteger / coefficient;
}

// Функция возвращает случайный элемент массива
let getRandomElement = function(elements) {
  let randomIndex = getRandomInteger(0, elements.length - 1);
  return elements[randomIndex];
};

// Получение нескольких случайных элементов массива
let getRandomArray = function(array, count = getRandomInteger(0, array.length)) {
  for (let i = array.length - 1; i > (array.length - 1) - count; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(array.length - count);
}

// Формирование тестовой информации по объекту недвижимости
let getTestApartment = function() {
  let xPosition = getRandomFloat(MIN_X, MAX_X, 5);
  let yPosition = getRandomFloat(MIN_Y, MAX_Y, 5);
  return {
    author: {
      avatar: 'img/avatars/user' + String(getRandomInteger(1, AVATAR_COUNT)).padStart(2, '0') + '.png',
    },
    offer: {
      title: getRandomElement(TITLES),
      address: xPosition.toFixed(5) + ', ' + yPosition.toFixed(5),
      price: getRandomFloat(MIN_PRICE, MAX_PRICE, 2),
      type: getRandomElement(TYPES),
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

let apartments = getApartments(10);

alert(apartments.length);
