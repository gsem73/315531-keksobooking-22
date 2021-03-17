// Загрузка фотографий

// Аватарка

const DEFAULT_SOURCE = 'img/muffin-grey.svg';

const avatarEdit = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const avatarImage = avatarPreview.querySelector('img');

const onAvatarEditChange = function() {
  const file = avatarEdit.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      avatarImage.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

avatarEdit.addEventListener('change', onAvatarEditChange)

// Фотография жилья

const photoEdit = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');

photoPreview.style.backgroundRepeat = 'no-repeat';
photoPreview.style.backgroundPosition = 'center';
photoPreview.style.backgroundSize = 'contain';

const onPhotoEditChange = function() {
  const file = photoEdit.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      photoPreview.style.backgroundImage = 'url(' + reader.result + ')';
    });
    reader.readAsDataURL(file);
  }
};

photoEdit.addEventListener('change', onPhotoEditChange);

// Сброс

const resetPreview = function() {
  avatarImage.src = DEFAULT_SOURCE;
  photoPreview.style.backgroundImage = 'none';
};

export {resetPreview};
