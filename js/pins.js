'use strict';
(function () {
  var pinContainer = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content;
  var pinButton = pinTemplate.querySelector('button');

  var renderPins = function (mark) {
    var pinElement = pinButton.cloneNode(true);
    var picture = pinElement.querySelector('img');
    picture.src = mark.author.avatar;
    picture.alt = mark.offer.type;
    pinElement.style.left = mark.location.x + 'px';
    pinElement.style.top = mark.location.y + 'px';
    pinElement.addEventListener('click', function () {
      window.card.appendToDom(mark);
    });
    pinElement.addEventListener('keydown', function (e) {
      if (window.utilities.isEscPressed(e)) {
        window.card.appendToDom(mark);
      }
    });
    return pinElement;
  };
  var appendPinsToDom = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPins(pins[i]));
    }
    var mapPins = pinContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < mapPins.length; j++) {
      pinContainer.removeChild(mapPins[j]);
    }
    pinContainer.appendChild(fragment);
  };
  var deletePins = function () {
    var mapPins = pinContainer.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < mapPins.length; j++) {
      pinContainer.removeChild(mapPins[j]);
    }
  };

  window.pins = {
    render: renderPins,
    appendToDom: appendPinsToDom,
    delete: deletePins
  };
})();
