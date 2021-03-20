// Вспомогательные функции

// Список интерактивных элементов
const controlList = 'input, select, button, fieldset, textarea';

// Установка атрибута disabled у всех интерактивных элементов формы
const disableControl = function(form) {
  const elements = form.querySelectorAll(controlList);
  for (let i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', '');
  }
};

// Сброс атрибута disabled у всех интерактивных элементов формы
const enableControl = function(form) {
  const elements = form.querySelectorAll(controlList);
  for (let i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
};

export{disableControl, enableControl};
