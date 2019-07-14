'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFaded = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var adFormAdress = document.querySelector('#address');

  var getCoordinates = function (coordinate, faded) {
    var rect = coordinate.getBoundingClientRect();
    var x = mapFaded.getBoundingClientRect();
    var xCoordinate = Math.round(rect.left - x.left) + (window.constants.PINWIDTH / 2);
    var yCoordinate = Math.round(rect.top - x.top) + (window.constants.PINHEIGHT / 2);
    if (!faded) {
      yCoordinate = Math.round(rect.top - x.top) + window.constants.PINHEIGHT;
    }
    return xCoordinate + ', ' + yCoordinate;
  };

  adFormAdress.value = getCoordinates(mapPinMain, mapFaded);
  // максимум подвижности (module5-task1)

  function activatePoints() {
    window.load(window.render.setAds, window.createPin.errorHandler);
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
    height: areaRect.height,
  };

  var pinRect = mapPinMain.getBoundingClientRect();
  var pinSize = {
    width: pinRect.left + (window.constants.PINWIDTH / 2),
    height: pinRect.top + window.constants.PINHEIGHT,
  };
  var pinCords = {
    x: pinSize.width,
    y: pinSize.height
  };

  function validateBound(coords, bound) {
    var newCoords = {
      x: coords.x,
      y: coords.y
    };
    if (newCoords.x >= bound.width - window.constants.PINWIDTH) {
      newCoords.x = bound.width - window.constants.PINWIDTH;
    }

    if (newCoords.x < 0) {
      newCoords.x = 0;
    }

    if (newCoords.y >= bound.height) {
      newCoords.y = bound.height - window.constants.PINHEIGHT;
    }

    if (newCoords.y < 0) {
      newCoords.y = 130;
    }

    return newCoords;
  }

  function movePoint(newCoords) {
    mapPinMain.style.top = newCoords.y + 'px';
    mapPinMain.style.left = newCoords.x + 'px';
    setAdress(newCoords);
  }

  function setAdress(coords) {
    adFormAdress.value = coords.x + ', ' + coords.y;
  }

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (!activated) {
      activatePoints();
    }

    adFormAdress.value = getCoordinates(mapPinMain);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

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
})();
