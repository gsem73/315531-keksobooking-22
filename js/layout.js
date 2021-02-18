function createApartmentNodes(data) {
  const template = document.querySelector('#card').content.querySelector('.popup');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < data.length; i++) {
    const element = template.cloneNode(true);

    const offerTitle = element.querySelector('.popup__title');
    offerTitle.textContent = data[i].offer.title;

    const offerAddress = element.querySelector('.popup__text--address');
    offerAddress.textContent = data[i].offer.address;

    const offerPrice = element.querySelector('.popup__text--price');
    offerPrice.innerHTML = data[i].offer.price + ' <span>₽/ночь</span>';

    const apartmentType = element.querySelector('.popup__type');
    switch(data[i].offer.type) {
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
        apartmentType.textContent = data[i].offer.type;
    }

    const offerCapacity = element.querySelector('.popup__text--capacity');
    offerCapacity.textContent = data[i].offer.rooms + ' комнаты для ' + data[i].offer.guests + ' гостей';

    const offerTime = element.querySelector('.popup__text--time');
    offerTime.textContent = 'Заезд после ' + data[i].offer.checkin + ', выезд до ' + data[i].offer.checkout;

    const offerFeatures = element.querySelector('.popup__features');
    for (let j = 0; j < offerFeatures.children.length; j++) {
      offerFeatures.children[j].style.display = 'none';
    }
    if (data[i].offer.features.length > 0) {
      for (let j = 0; j < data[i].offer.features.length; j++) {
        let featureItem = offerFeatures.querySelector('.popup__feature--' + data[i].offer.features[j]);
        featureItem.style.display = 'inline-block';
      }
    } else {
      offerFeatures.style.display = 'none';
    }

    const offerDescription = element.querySelector('.popup__description');
    if (data[i].offer.description !== '') {
      offerDescription.textContent = data[i].offer.description;
    } else {
      offerDescription.style.display = 'none';
    }

    const offerPhotos = element.querySelector('.popup__photos');
    const photoTemplate = offerPhotos.removeChild(offerPhotos.children[0]);
    if (data[i].offer.photos.length > 0) {
      for (let j = 0; j < data[i].offer.photos.length; j++) {
        let photoItem = photoTemplate.cloneNode(photoTemplate);
        photoItem.setAttribute('src', data[i].offer.photos[j]);
        offerPhotos.appendChild(photoItem);
      }
    } else {
      offerPhotos.style.display = 'none';
    }

    const authorAvatar = element.querySelector('.popup__avatar');
    authorAvatar.setAttribute('src', data[i].author.avatar);

    fragment.appendChild(element);
  }

  return fragment;
}

export {createApartmentNodes};
