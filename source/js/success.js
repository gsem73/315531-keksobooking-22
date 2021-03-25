// Сообщение о успешной отправке данных

const main = document.querySelector('main');
const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');

const closePopup = function() {
  const popup = document.querySelector('.success');
  main.removeChild(popup);
  document.removeEventListener('keydown', onSuccessPopupKeyDown);
}

const onSuccessPopupClick = function() {
  closePopup();
};

const onSuccessPopupKeyDown = function(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
};

const showSuccessPopup = function() {
  const successPopup = main.appendChild(successPopupTemplate.cloneNode(true));
  successPopup.addEventListener('click', onSuccessPopupClick);
  document.addEventListener('keydown', onSuccessPopupKeyDown);
};

export {showSuccessPopup};
