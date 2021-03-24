// Сообщение о успешной отправке данных

const main = document.querySelector('main');
const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');

const onSuccessPopupClick = function() {
  const popup = document.querySelector('.success');
  main.removeChild(popup);
  document.removeEventListener('keydown', onSuccessPopupKeyDown);
};

const onSuccessPopupKeyDown = function(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.success');
    main.removeChild(popup);
    document.removeEventListener('keydown', onSuccessPopupKeyDown);
  }
};

const showSuccessPopup = function() {
  const successPopup = main.appendChild(successPopupTemplate.cloneNode(true));
  successPopup.addEventListener('click', onSuccessPopupClick);
  document.addEventListener('keydown', onSuccessPopupKeyDown);
};

export {showSuccessPopup};
