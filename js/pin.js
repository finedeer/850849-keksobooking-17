'use strict';
(function () {
  var mainPinButton = document.querySelector('.map__pin--main');
  var adFormAdress = document.querySelector('#address');
  var MovementArea = {
    top: 130,
    bottom: 630
  };

  var map = document.querySelector('.map__overlay');
  var mapRect = map.getBoundingClientRect();
  var mapSize = {
    width: mapRect.width,
    height: mapRect.height
  };
  var mapCords = {
    x: mapRect.left,
    y: mapRect.top
  };

  var pinRect = mainPinButton.getBoundingClientRect();
  var pinSize = {
    width: pinRect.width,
    height: pinRect.height
  };
  var pinCords = {
    x: pinRect.left + (pinSize.width / 2) - mapCords.x,
    y: pinRect.top + (pinSize.height / 2) - mapCords.y
  };

  var setAdress = function (coords) {
    adFormAdress.value = Math.round(coords.x) + ', ' + Math.round(coords.y);
  };

  setAdress(pinCords);

  var activatePage = function () {
    window.data.getPins(function () {
      window.pins.appendToDom(window.data.getFilteredPins());
    });
    window.form.enable();
    activated = true;
    pinCords = {
      x: pinRect.left + (pinSize.width / 2) - mapCords.x,
      y: pinRect.top + pinSize.height + window.constants.NEEDLE_SIZE - mapCords.y
    };
    setAdress(pinCords);
  };
  var activated = false;

  var resetPin = function () {
    activated = false;
    pinCords = {
      x: pinRect.left + (pinSize.width / 2) - mapCords.x,
      y: pinRect.top + (pinSize.height / 2) - mapCords.y
    };
    movePoint(pinCords);
    setAdress(pinCords);
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

    if (newCoords.y > MovementArea.bottom + pinSize.height - window.constants.NEEDLE_SIZE / 2) {
      newCoords.y = MovementArea.bottom + pinSize.height - window.constants.NEEDLE_SIZE / 2;
    }

    if (newCoords.y < MovementArea.top) {
      newCoords.y = MovementArea.top;
    }

    return newCoords;
  };

  var movePoint = function (newCoords) {
    mainPinButton.style.top = newCoords.y - pinSize.height + 'px';
    mainPinButton.style.left = newCoords.x - pinSize.width / 2 + 'px';
    setAdress(newCoords);
  };

  mainPinButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (!activated) {
      activatePage();
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    setAdress(validateBound(pinCords, mapSize));

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

      pinCords = validateBound(newCoords, mapSize);

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
  mainPinButton.addEventListener('keydown', function (e) {
    if (window.utilities.isEnterPressed(e)) {
      if (!activated) {
        activatePage();
      }
    }
  });

  window.pin = {
    activatePoints: activatePage,
    setAdress: setAdress,
    pinCords: pinCords,
    reset: resetPin
  };
})();
