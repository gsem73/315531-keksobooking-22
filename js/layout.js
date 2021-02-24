const template = document.querySelector('#card').content.querySelector('.popup');

function createApartmentNodes(realtyAds) {

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < realtyAds.length; i++) {
    const element = template.cloneNode(true);

    const offerTitle = element.querySelector('.popup__title');
    offerTitle.textContent = realtyAds[i].offer.title;

    const offerAddress = element.querySelector('.popup__text--address');
    offerAddress.textContent = realtyAds[i].offer.address;

    const offerPrice = element.querySelector('.popup__text--price');
    offerPrice.firstChild.nodeValue = realtyAds[i].offer.price.toLocaleString() + ' ';

    const apartmentType = element.querySelector('.popup__type');
    switch(realtyAds[i].offer.type) {
      case 'palace':
        apartmentType.textContent = 'Дворец';
        break;
      case 'flat':
        apartmentType.textContent = 'Квартира';
        break;
      case 'house':
        apartmentType.textContent = 'Дом';
        break;
      case 'bungalow':
        apartmentType.textContent = 'Бунгало';
        break;
      default:
        apartmentType.textContent = realtyAds[i].offer.type;
    }

    const offerCapacity = element.querySelector('.popup__text--capacity');
    offerCapacity.textContent = realtyAds[i].offer.rooms + ' комнаты для ' + realtyAds[i].offer.guests + ' гостей';

    const offerTime = element.querySelector('.popup__text--time');
    offerTime.textContent = 'Заезд после ' + realtyAds[i].offer.checkin + ', выезд до ' + realtyAds[i].offer.checkout;

    const offerFeatures = element.querySelector('.popup__features');
    for (let j = 0; j < offerFeatures.children.length; j++) {
      offerFeatures.children[j].style.display = 'none';
    }
    if (realtyAds[i].offer.features.length > 0) {
      for (let j = 0; j < realtyAds[i].offer.features.length; j++) {
        let featureItem = offerFeatures.querySelector('.popup__feature--' + realtyAds[i].offer.features[j]);
        featureItem.style.display = 'inline-block';
      }
    } else {
      offerFeatures.style.display = 'none';
    }

    const offerDescription = element.querySelector('.popup__description');
    if (realtyAds[i].offer.description !== '') {
      offerDescription.textContent = realtyAds[i].offer.description;
    } else {
      offerDescription.style.display = 'none';
    }

    const offerPhotos = element.querySelector('.popup__photos');
    const photoTemplate = offerPhotos.removeChild(offerPhotos.children[0]);
    if (realtyAds[i].offer.photos.length > 0) {
      for (let j = 0; j < realtyAds[i].offer.photos.length; j++) {
        let photoItem = photoTemplate.cloneNode(photoTemplate);
        photoItem.setAttribute('src', realtyAds[i].offer.photos[j]);
        offerPhotos.appendChild(photoItem);
      }
    } else {
      offerPhotos.style.display = 'none';
    }

    const authorAvatar = element.querySelector('.popup__avatar');
    authorAvatar.setAttribute('src', realtyAds[i].author.avatar);

    fragment.appendChild(element);
  }

  return fragment;
}

export {createApartmentNodes};
