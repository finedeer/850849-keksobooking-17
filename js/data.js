// Файл data.js
'use strict';
(function () {
  /* var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var housingWifi = mapFilters.querySelector('#filter-wifi');
  var housingDishwasher = mapFilters.querySelector('#filter-dishwasher');
  var housingParking = mapFilters.querySelector('#filter-parking');
  var housingWasher = mapFilters.querySelector('#filter-washer');
  var housingElevator = mapFilters.querySelector('#filter-elevator');
  var housingConditioner = mapFilters.querySelector('filter-conditioner');*/
  var filtersMap = {
    '#housing-type': 'type',
    '#housing-price': 'price',
    '#housing-rooms': 'rooms',
    '#housing-guests': 'guests',
    '#filter-wifi': 'wifi',
    '#filter-dishwasher': 'dishwasher',
    '#filter-parking': 'parking',
    '#filter-washer': 'washer',
    '#filter-elevator': 'elevator',
    'filter-conditioner': 'conditioner',
    '#housing-features': 'features'
  };
  var synchronizePriceInDiapason = function (diapason, value) {
    switch (diapason) {
      case 'any':
        return true;
      case 'middle':
        return (value <= 50000) && (value >= 10000);
      case 'low':
        return value < 10000;
      case 'high':
        return value > 50000;
      default:
        return false;
    }
  };

  var pins = [];
  function getPins(onGetPins) {
    window.load.getData(function (localPins) {
      pins = localPins;
      onGetPins(pins);
    },
    window.createPin.errorHandler);
  }

  function getFilteredPins(conditions) {
    if (!conditions) {
      return pins.slice(0, 5);
    }

    var newPins = pins.slice(0);

    if (conditions.value) {
      newPins = newPins.filter(function (pin) {
        return pin.value === conditions.value;
      });
    }

    if (conditions.price) {
      newPins = newPins.filter(function (pin) {
        return pin.price === conditions.price;
      });
    }

    if (conditions.rooms) {
      newPins = newPins.filter(function (pin) {
        return pin.rooms === conditions.rooms;
      });
    }
    if (conditions.guests) {
      newPins = newPins.filter(function (pin) {
        return pin.guests === conditions.guests;
      });
    }

    return newPins.slice(0, 5);
  }

  window.data = {
    getPins: getPins,
    getFilteredPins: getFilteredPins
  };

})();
