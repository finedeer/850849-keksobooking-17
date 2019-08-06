'use strict';
(function () {
  var mainPinButton = document.querySelector('.map__pin--main');
  var adFormAdress = document.querySelector('#address');

  var activatePoints = function () {
    window.data.getPins(function () {
      window.pins.appendToDom(window.data.getFilteredPins());
      window.card.appendToDom(window.data.getFilteredPins()[0]);
    });
    window.form.unable();
    activated = true;
  };
  var activated = false;

  var areaNode = document.querySelector('.map');
  var areaRect = areaNode.getBoundingClientRect();
  var boundSize = {
    width: areaRect.width,
    height: areaRect.height
  };

  var pinRect = mainPinButton.getBoundingClientRect();
  var pinSize = {
    width: pinRect.width,
    height: pinRect.height
  };
  var pinCords = {
    x: boundSize.width / 2,
    y: boundSize.height / 2
  };

  var resetPin = function () {
    activated = false;
    pinCords = {
      x: boundSize.width / 2,
      y: boundSize.height / 2
    };
    setAdress(pinCords);
    movePoint(pinCords);
  };

  var validateBound = function (coords, bound) {
    var newCoords = {
      x: coords.x,
      y: coords.y
    };
    if (newCoords.x > bound.width - pinSize.width / 2) {
      newCoords.x = bound.width - pinSize.width / 2;
    }

    if (newCoords.x < pinSize.width / 2) {
      newCoords.x = pinSize.width / 2;
    }

    if (newCoords.y > bound.height - pinSize.height) {
      newCoords.y = bound.height - pinSize.height;
    }

    if (newCoords.y < pinSize.height * 2) {
      newCoords.y = pinSize.height * 2;
    }

    return newCoords;
  };

  var movePoint = function (newCoords) {
    mainPinButton.style.top = newCoords.y - pinSize.height / 4 + 'px';
    mainPinButton.style.left = newCoords.x - pinSize.width / 2 + 'px';
    setAdress(newCoords);
  };

  var setAdress = function (coords) {
    adFormAdress.value = coords.x + ', ' + coords.y;
  };

  setAdress(pinCords);

  mainPinButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


    if (!activated) {
      activatePoints();
    }


    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    setAdress(validateBound(pinCords, boundSize));

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoords = {
        x: pinCords.x - shift.x,
        y: pinCords.y - shift.y,
      };

      pinCords = validateBound(newCoords, boundSize);

      movePoint(pinCords);
      setAdress(newCoords);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pin = {
    activatePoints: activatePoints,
    setAdress: setAdress,
    pinCords: pinCords,
    reset: resetPin
  };
})();
