'use strict';
(function () {
  var mapPinsNode = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content;
  var pinTemplate = template.querySelector('button');

  var renderPins = function (mark) {
    var pinElement = pinTemplate.cloneNode(true);
    var picture = pinElement.querySelector('img');
    picture.src = mark.author.avatar;
    picture.alt = mark.offer.type;
    pinElement.style.left = mark.location.x + 'px';
    pinElement.style.top = mark.location.y + 'px';
    pinElement.addEventListener('click', function () {
      window.card.appendCardToDom(mark);
    });
    pinElement.addEventListener('keydown', function (e) {
      if (window.utilities.isEscPressed(e)) {
        window.card.appendCardToDom(mark);
      }
    });
    return pinElement;
  };
  var appendPinsToDom = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPins(pins[i]));
    }
    var mapPins = mapPinsNode.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < mapPins.length; j++) {
      mapPinsNode.removeChild(mapPins[j]);
    }
    mapPinsNode.appendChild(fragment);
  };
  var deletePins = function () {
    var mapPins = mapPinsNode.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < mapPins.length; j++) {
      mapPinsNode.removeChild(mapPins[j]);
    }
  };

  window.createPin = {
    renderPins: renderPins,
    appendPinsToDom: appendPinsToDom,
    deletePins: deletePins
  };
})();
