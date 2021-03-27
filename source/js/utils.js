// Вспомогательные функции

// Список интерактивных элементов
const controlList = 'input, select, button, fieldset, textarea';

// Установка атрибута disabled у всех интерактивных элементов формы
const disableControl = function(form) {
  const elements = form.querySelectorAll(controlList);
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
};

// Сброс атрибута disabled у всех интерактивных элементов формы
const enableControl = function(form) {
  const elements = form.querySelectorAll(controlList);
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
};

const debounce = function(callback, delay) {

  let isCooldown = false;

  const resetCooldown = function() {
    isCooldown = false;
  };

  return function() {
    if (isCooldown) {
      return;
    }
    callback.apply(this, arguments);
    isCooldown = true;
    setTimeout(resetCooldown, delay);
  };

}

export{disableControl, enableControl, debounce};
