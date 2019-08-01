'use strict';
(function () {
  var mapPinsNode = document.querySelector('.map__pins');
  var template = document.querySelector('#card').content;
  // var cardTemplate = template.querySelector('.map__card');

  var housingTypes = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец',
    'any': 'Тип не указан'
  };

  var renderCard = function (card) {
    var cardElement = template.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь.';
    cardElement.querySelector('.popup__type').textContent = housingTypes[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для' + card.offer.guests + ' гостей.';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    // вопрос
    var popupFeaturesNodes = cardElement.querySelector('.popup__features');
    var templateFeatures = popupFeaturesNodes.querySelector('.popup__feature');
    popupFeaturesNodes.removeChild(templateFeatures);
    var popupFeatures = card.offer.features;
    for (var j = 0; j < popupFeatures.length; j++) {
      var newFeature = document.createElement('li');
      newFeature.class = 'popup__feature popup__feature--' + popupFeatures[j];
      // popupFeaturesNodes.replaceChild(newFeature, templateFeatures);
      popupFeaturesNodes.appendChild(newFeature);
    }
    var popupPhptosNodes = cardElement.querySelector('.popup__photos');
    var popupPhptos = card.offer.photos;
    popupPhptosNodes.removeChild(popupPhptosNodes.querySelector('img'));
    for (var i = 0; i < popupPhptos.length; i++) {
      var newImg = document.createElement('img');
      newImg.src = popupPhptos[i];
      newImg.class = 'popup__photo';
      newImg.width = '45';
      newImg.height = '40';
      newImg.alt = 'Фотография жилья';
      popupPhptosNodes.appendChild(newImg);
    }
    return cardElement;
  };


  var appendCardToDom = function (card) {
    var fragment = document.createDocumentFragment();
    removeCard();
    fragment.appendChild(renderCard(card));
    mapPinsNode.appendChild(fragment);
    var mapCardCloseNode = document.querySelector('.map__pins .popup__close');
    listenClosePopup(mapCardCloseNode);
  };
  function removeCard() {
    var mapCardNode = document.querySelector('.map__pins .map__card');
    if (mapCardNode) {
      mapCardNode.parentElement.removeChild(mapCardNode);
    }
  }


  var listenClosePopup = function (buttonClose) {
    buttonClose.addEventListener('click', function () {
      removeCard();
    });
    buttonClose.addEventListener('keydown', function (e) {
      if (window.utilities.isEscPressed(e)) {
        removeCard();
      }
    });
  };


  window.card = {
    renderCard: renderCard,
    appendCardToDom: appendCardToDom,
    removeCard: removeCard
  };
})();
