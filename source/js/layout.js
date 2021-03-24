const realyTypeDescription = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const template = document.querySelector('#card').content.querySelector('.popup');

const createBalloonLayout = function(realty) {

  const balloon = template.cloneNode(true);

  const offerTitle = balloon.querySelector('.popup__title');
  offerTitle.textContent = realty.offer.title;

  const offerAddress = balloon.querySelector('.popup__text--address');
  offerAddress.textContent = realty.offer.address;

  const offerPrice = balloon.querySelector('.popup__text--price');
  offerPrice.firstChild.nodeValue = realty.offer.price.toLocaleString() + ' ';

  const apartmentType = balloon.querySelector('.popup__type');
  apartmentType.textContent = realyTypeDescription[realty.offer.type];

  const offerCapacity = balloon.querySelector('.popup__text--capacity');
  offerCapacity.textContent = realty.offer.rooms + ' комнаты для ' + realty.offer.guests + ' гостей';

  const offerTime = balloon.querySelector('.popup__text--time');
  offerTime.textContent = 'Заезд после ' + realty.offer.checkin + ', выезд до ' + realty.offer.checkout;

  const offerFeatures = balloon.querySelector('.popup__features');
  for (let j = 0; j < offerFeatures.children.length; j++) {
    offerFeatures.children[j].style.display = 'none';
  }
  if (realty.offer.features.length > 0) {
    for (let j = 0; j < realty.offer.features.length; j++) {
      let featureItem = offerFeatures.querySelector('.popup__feature--' + realty.offer.features[j]);
      featureItem.style.display = 'inline-block';
    }
  } else {
    offerFeatures.style.display = 'none';
  }

  const offerDescription = balloon.querySelector('.popup__description');
  if (realty.offer.description !== '') {
    offerDescription.textContent = realty.offer.description;
  } else {
    offerDescription.style.display = 'none';
  }

  const offerPhotos = balloon.querySelector('.popup__photos');
  const photoTemplate = offerPhotos.removeChild(offerPhotos.children[0]);
  if (realty.offer.photos.length > 0) {
    for (let j = 0; j < realty.offer.photos.length; j++) {
      let photoItem = photoTemplate.cloneNode(photoTemplate);
      photoItem.setAttribute('src', realty.offer.photos[j]);
      offerPhotos.appendChild(photoItem);
    }
  } else {
    offerPhotos.style.display = 'none';
  }

  const authorAvatar = balloon.querySelector('.popup__avatar');
  authorAvatar.setAttribute('src', realty.author.avatar);

  return balloon;
}

export {createBalloonLayout};
