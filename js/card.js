'use strict';
(function () {
  var pinContainer = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card').content;

  var valueToOption = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец',
    'any': 'Тип не указан'
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    if (!card.offer.title) {
      cardElement.querySelector('.popup__title').remove();
    } else {
      cardElement.querySelector('.popup__title').textContent = card.offer.title;
    }
    if (!card.offer.address) {
      cardElement.querySelector('.popup__text--address').remove();
    } else {
      cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    }
    if (!card.offer.price) {
      cardElement.querySelector('.popup__text--price').remove();
    } else {
      cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь.';
    }
    if (!card.offer.type) {
      cardElement.querySelector('.popup__type').remove();
    } else {
      cardElement.querySelector('.popup__type').textContent = valueToOption[card.offer.type];
    }
    if (!card.offer.rooms) {
      cardElement.querySelector('.popup__text--capacity').remove();
    } else {
      cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для' + card.offer.guests + ' гостей.';
    }
    if (!card.offer.checkin) {
      cardElement.querySelector('.popup__text--time').remove();
    } else {
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'выезд до ' + card.offer.checkout;
    }
    if (!card.offer.description) {
      cardElement.querySelector('.popup__description').remove();
    } else {
      cardElement.querySelector('.popup__description').textContent = card.offer.description;
    }
    if (!card.author.avatar) {
      cardElement.querySelector('.popup__avatar').remove();
    } else {
      cardElement.querySelector('.popup__avatar').src = card.author.avatar;
      var popupFeaturesContainer = cardElement.querySelector('.popup__features');
      popupFeaturesContainer.innerHTML = '';
      var popupFeatures = card.offer.features;
      for (var j = 0; j < popupFeatures.length; j++) {
        var newFeature = document.createElement('li');
        newFeature.className = 'popup__feature popup__feature--' + popupFeatures[j];
        popupFeaturesContainer.appendChild(newFeature);
      }
    }
    if (!card.offer.photos) {
      popupPhptosContainer = cardElement.querySelector('.popup__photos').remove();
    } else {
      var popupPhptosContainer = cardElement.querySelector('.popup__photos');
      var popupPhptos = card.offer.photos;
      popupPhptosContainer.innerHTML = '';
      for (var i = 0; i < popupPhptos.length; i++) {
        var newImg = document.createElement('img');
        newImg.src = popupPhptos[i];
        newImg.className = 'popup__photo';
        newImg.width = '45';
        newImg.height = '40';
        newImg.alt = 'Фотография жилья';
        popupPhptosContainer.appendChild(newImg);
      }
    }
    return cardElement;
  };


  var appendCardToDom = function (card) {
    var fragment = document.createDocumentFragment();
    removeCard();
    fragment.appendChild(renderCard(card));
    pinContainer.appendChild(fragment);
    var cardCloseButton = document.querySelector('.map__pins .popup__close');
    closePopupByButton(cardCloseButton);
  };

  var removeCard = function () {
    var mapCardNode = document.querySelector('.map__pins .map__card');
    if (mapCardNode) {
      mapCardNode.parentElement.removeChild(mapCardNode);
    }
  };

  var closePopupByButton = function (button) {
    button.addEventListener('click', removeCard);
    button.addEventListener('keydown', function (e) {
      if (window.utilities.isEscPressed(e)) {
        removeCard();
      }
    });
  };


  window.card = {
    render: renderCard,
    appendToDom: appendCardToDom,
    remove: removeCard
  };
})();
