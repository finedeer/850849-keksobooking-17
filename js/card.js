'use strict';
(function () {
  var mapPinsNode = document.querySelector('.map__pins');
  var template = document.querySelector('#card').content;
  // var cardTemplate = template.querySelector('.map__card');
  var popupClose = template.querySelector('.popup__close');

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
    fragment.appendChild(renderCard(card));
    mapPinsNode.appendChild(fragment);
  };

  // сoкрытие карточки тут тоже вопрос?
  var closePopup = function (element) {
    popupClose.addEventListener('click', function () {
      element.classList.add('visually-hidden');
      popupClose.removeEventListener('keydown');
    });
  };


  window.card = {
    renderCard: renderCard,
    appendCardToDom: appendCardToDom,
    closePopup: closePopup
  };
})();
