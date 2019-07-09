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
    return pinElement;
  };
  var appendPinsToDom = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPins(pins[i]));
    }
    mapPinsNode.appendChild(fragment);
  };
  window.createPin = {
    appendPinsToDom: appendPinsToDom
  };
})();
