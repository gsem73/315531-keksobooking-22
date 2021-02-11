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
  let coefficient = (10 ** precision);
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

export {getRandomInteger, getRandomFloat, getRandomElement, getRandomArray};
