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
    'housing-type': 'type',
    'housing-price': 'price',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests',
    'filter-wifi': 'wifi',
    'filter-dishwasher': 'dishwasher',
    'filter-parking': 'parking',
    'filter-washer': 'washer',
    'filter-elevator': 'elevator',
    'filter-conditioner': 'conditioner'
  };
  var synchronizePriceInDiapason = function (diapason, value) {
    switch (diapason) {
      case 'any':
        return true;
      case 'middle':
        return value <= 50000 && value >= 10000;
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
    window.loadUpload.getData(function (localPins) {
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

    newPins = newPins.filter(function (pin) {
    /*  for (var key in conditions) {
        if (conditions[key] === 'any') {
          continue;
        }
      }*/
      if (conditions['housing-rooms'] !== 'any' && pin.offer.rooms !== +conditions['housing-rooms']) {
        return false;
      }
      if (conditions['housing-guests'] !== 'any' && pin.offer.guests !== +conditions['housing-guests']) {
        return false;
      }
      if (conditions['housing-type'] !== 'any' && pin.offer.type !== conditions['housing-type']) {
        return false;
      }
      if (conditions['housing-price'] !== 'any' && synchronizePriceInDiapason(pin.offer.price, conditions['housing-price']) !== conditions['housing-price']) {
        console.log(synchronizePriceInDiapason(conditions['housing-price'], pin.offer.price))
        return false;
      }
      for (var key in conditions) {
        if (conditions[key] !== 'any') {
          continue;
        }
        if (typeof pin.offer[filtersMap[key]] === 'boolean' && conditions[key]) {
          if (pin.offer.features.indexOf(filtersMap[key]) === -1) {
            return false;
          } else {
            continue;
          }
        }
      }
      /* var conditionsValue = conditions[key];
        var offerValue = pin.offer[filtersMap[key]];

        if (key === 'housing-price') {
          if (synchronizePriceInDiapason(conditionsValue, offerValue)) {
            continue;
          } else {
            return false;
          }
        }

        if (typeof offerValue === 'number') {
          conditionsValue = +conditionsValue;
        }

        if (typeof offerValue === 'boolean' && conditionsValue) {
          if (pin.offer.features.indexOf(filtersMap[key]) === -1) {
            return false;
          } else {
            continue;
          }
        }

        if (pin.offer.rooms !== conditionsValue) {
          return false;
        } else {
          continue;
        }*/
      // }
      return true;
    });

    return newPins.slice(0, 5);

  }

  window.data = {
    getPins: getPins,
    getFilteredPins: getFilteredPins
  };

})();
