// Сообщение об ошибке, возникшей при отправке данных

const main = document.querySelector('main');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');

const closePopup = function() {
  const popup = document.querySelector('.error');
  main.removeChild(popup);
  document.removeEventListener('keydown', onErrorPopupKeyDown);
};

const onErrorPopupClick = function() {
  closePopup();
};

const onErrorPopupKeyDown = function(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
};

const showErrorPopup = function() {
  const errorPopup = main.appendChild(errorPopupTemplate.cloneNode(true));
  errorPopup.addEventListener('click', onErrorPopupClick);
  document.addEventListener('keydown', onErrorPopupKeyDown);
};

export {showErrorPopup};
