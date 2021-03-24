// Сообщение об ошибке, возникшей при отправке данных

const main = document.querySelector('main');
const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');

const onErrorPopupClick = function() {
  const popup = document.querySelector('.error');
  main.removeChild(popup);
  document.removeEventListener('keydown', onErrorPopupKeyDown);
};

const onErrorPopupKeyDown = function(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.error');
    main.removeChild(popup);
    document.removeEventListener('keydown', onErrorPopupKeyDown);
  }
};

const showErrorPopup = function() {
  const errorPopup = main.appendChild(errorPopupTemplate.cloneNode(true));
  errorPopup.addEventListener('click', onErrorPopupClick);
  document.addEventListener('keydown', onErrorPopupKeyDown);
};

export {showErrorPopup};
