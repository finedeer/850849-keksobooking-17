'use strict';
(function () {
  var pinContainer = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content;
  var pinButton = pinTemplate.querySelector('button');

  var renderPin = function (mark) {
    var pinElement = pinButton.cloneNode(true);
    var picture = pinElement.querySelector('img');
    picture.src = mark.author.avatar;
    picture.alt = mark.offer.type;
    pinElement.style.left = mark.location.x + 'px';
    pinElement.style.top = mark.location.y + 'px';
    var showCard = function () {
      window.card.appendToDom(mark);
      var activePin = document.querySelector('.map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
      pinElement.classList.add('map__pin--active');
    };
    pinElement.addEventListener('click', showCard);
    pinElement.addEventListener('keydown', function (e) {
      if (window.utilities.isEscPressed(e)) {
        window.card.remove();
      }
    });
    return pinElement;
  };

  var appendPinsToDom = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    var adsPins = pinContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < adsPins.length; j++) {
      pinContainer.removeChild(adsPins[j]);
    }
    pinContainer.appendChild(fragment);
  };
  var deletePins = function () {
    var adsPins = pinContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < adsPins.length; j++) {
      pinContainer.removeChild(adsPins[j]);
    }
  };

  window.pins = {
    render: renderPin,
    appendToDom: appendPinsToDom,
    delete: deletePins
  };
})();
