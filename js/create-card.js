'use strict';
(function () {
  var mapPinsNode = document.querySelector('.map__pins');
  var template = document.querySelector('#card').content;
  var cardTemplate = template.querySelector('.map__card');

  var getНousingType = function (type) {
    var housingType = '';
    switch (type) {
      case 'flat':
        housingType = 'Квартира';
        break;
      case 'house':
        housingType = 'Дом';
        break;
      case 'bungalo':
        housingType = 'Бунгало';
        break;
      case 'palace':
        housingType = 'Дворец';
        break;
      default:
        housingType = 'Тип не указан';
    }
    return housingType;
  };

  var renderCards = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь.';
    cardElement.querySelector('.popup__type').textContent = getНousingType(card.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для' + card.offer.guests + ' гостей.';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    var popupPhotos = cardElement.querySelector('.popup__photos');
    popupPhotos = card.offer.photos;
    for (var i = 0; i < popupPhotos.length; i++) {
      popupPhotos.querySelector('.popup__photo').src = popupPhotos[i];
    }
    return cardElement;
  };


  var appendCardsToDom = function (cards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < cards.length; i++) {
      fragment.appendChild(renderCards(cards[i]));
    }
    mapPinsNode.appendChild(fragment);
  };

  window.createCard = {
    renderCards: renderCards,
    appendCardsToDom: appendCardsToDom
  };
})();
