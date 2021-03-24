const realyTypeDescription = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const template = document.querySelector('#card').content.querySelector('.popup');

const createBalloonLayout = function(realtyJson) {

  const balloon = template.cloneNode(true);

  const offerTitle = balloon.querySelector('.popup__title');
  offerTitle.textContent = realtyJson.offer.title;

  const offerAddress = balloon.querySelector('.popup__text--address');
  offerAddress.textContent = realtyJson.offer.address;

  const offerPrice = balloon.querySelector('.popup__text--price');
  offerPrice.firstChild.nodeValue = realtyJson.offer.price.toLocaleString() + ' ';

  const apartmentType = balloon.querySelector('.popup__type');
  apartmentType.textContent = realyTypeDescription[realtyJson.offer.type];

  const offerCapacity = balloon.querySelector('.popup__text--capacity');
  offerCapacity.textContent = realtyJson.offer.rooms + ' комнаты для ' + realtyJson.offer.guests + ' гостей';

  const offerTime = balloon.querySelector('.popup__text--time');
  offerTime.textContent = 'Заезд после ' + realtyJson.offer.checkin + ', выезд до ' + realtyJson.offer.checkout;

  const offerFeatures = balloon.querySelector('.popup__features');
  for (let j = 0; j < offerFeatures.children.length; j++) {
    offerFeatures.children[j].style.display = 'none';
  }
  if (realtyJson.offer.features.length > 0) {
    for (let j = 0; j < realtyJson.offer.features.length; j++) {
      let featureItem = offerFeatures.querySelector('.popup__feature--' + realtyJson.offer.features[j]);
      featureItem.style.display = 'inline-block';
    }
  } else {
    offerFeatures.style.display = 'none';
  }

  const offerDescription = balloon.querySelector('.popup__description');
  if (realtyJson.offer.description !== '') {
    offerDescription.textContent = realtyJson.offer.description;
  } else {
    offerDescription.style.display = 'none';
  }

  const offerPhotos = balloon.querySelector('.popup__photos');
  const photoTemplate = offerPhotos.removeChild(offerPhotos.children[0]);
  if (realtyJson.offer.photos.length > 0) {
    for (let j = 0; j < realtyJson.offer.photos.length; j++) {
      let photoItem = photoTemplate.cloneNode(photoTemplate);
      photoItem.setAttribute('src', realtyJson.offer.photos[j]);
      offerPhotos.appendChild(photoItem);
    }
  } else {
    offerPhotos.style.display = 'none';
  }

  const authorAvatar = balloon.querySelector('.popup__avatar');
  authorAvatar.setAttribute('src', realtyJson.author.avatar);

  return balloon;
}

export {createBalloonLayout};
