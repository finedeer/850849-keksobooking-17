'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFaded = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var adFormAdress = document.querySelector('#address');

  function activatePoints() {
    window.data.getPins(function () {
      window.createPin.appendPinsToDom(window.data.getFilteredPins());
      window.card.appendCardToDom(window.data.getFilteredPins()[0]);
    });
    mapFaded.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    activated = true;
  }
  var activated = false;

  var areaNode = document.querySelector('.map__overlay');
  var areaRect = areaNode.getBoundingClientRect();
  var boundSize = {
    width: areaRect.width,
    height: areaRect.height
  };

  var pinRect = mapPinMain.getBoundingClientRect();
  var pinSize = {
    width: pinRect.width,
    height: pinRect.height + 19
  };
  var pinCords = {
    x: boundSize.width / 2,
    y: boundSize.height / 2
  };

  function resetPin() {
    activated = false;
    pinCords = {
      x: boundSize.width / 2,
      y: boundSize.height / 2
    };
    setAdress(pinCords);
  }

  function validateBound(coords, bound) {
    var newCoords = {
      x: coords.x,
      y: coords.y
    };
    if (newCoords.x > bound.width) {
      newCoords.x = bound.width;
    }

    if (newCoords.x < pinSize.width / 2) {
      newCoords.x = pinSize.width / 2;
    }

    if (newCoords.y > bound.height - 20) {
      newCoords.y = bound.height - 20;
    }

    if (newCoords.y < 130) {
      newCoords.y = 130;
    }

    return newCoords;
  }

  function movePoint(newCoords) {
    mapPinMain.style.top = newCoords.y - pinSize.height + 'px';
    mapPinMain.style.left = newCoords.x - pinSize.width / 2 + 'px';
    setAdress(newCoords);
  }

  function setAdress(coords) {
    adFormAdress.value = coords.x + ', ' + coords.y;
  }

  setAdress(pinCords);

  mapPinMain.addEventListener('mousedown', function (evt) {
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
    resetPin: resetPin
  };
})();
