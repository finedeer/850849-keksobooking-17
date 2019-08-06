'use strict';
(function () {

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

  var synchronizePriceInDiapason = function (value) {
    if (value > 50000) {
      return 'high';
    } else if (value < 10000) {
      return 'low';
    } else if (value <= 50000 && value >= 10000) {
      return 'middle';
    } else {
      return false;
    }
  };

  var pins = [];
  var getPins = function (onGetPins) {
    window.backend.getData(function (localPins) {
      pins = localPins;
      onGetPins(pins);
    },
    window.utilities.onError);
  };

  var getFilteredPins = function (conditions) {
    if (!conditions) {
      return pins.slice(0, 5);
    }

    var newPins = pins.slice(0);

    newPins = newPins.filter(function (pin) {

      if (conditions['housing-rooms'] !== 'any' && pin.offer.rooms !== +conditions['housing-rooms']) {
        return false;
      }
      if (conditions['housing-guests'] !== 'any' && pin.offer.guests !== +conditions['housing-guests']) {
        return false;
      }
      if (conditions['housing-type'] !== 'any' && pin.offer.type !== conditions['housing-type']) {
        return false;
      }
      if (conditions['housing-price'] !== 'any' && synchronizePriceInDiapason(pin.offer.price) !== conditions['housing-price']) {
        return false;
      }
      if (conditions['filter-wifi'] && pin.offer.features.indexOf(filtersMap['filter-wifi']) === -1) {
        return false;
      }
      if (conditions['filter-dishwasher'] && pin.offer.features.indexOf(filtersMap['filter-dishwasher']) === -1) {
        return false;
      }
      if (conditions['filter-parking'] && pin.offer.features.indexOf(filtersMap['filter-parking']) === -1) {
        return false;
      }
      if (conditions['filter-washer'] && pin.offer.features.indexOf(filtersMap['filter-washer']) === -1) {
        return false;
      }
      if (conditions['filter-elevator'] && pin.offer.features.indexOf(filtersMap['filter-elevator']) === -1) {
        return false;
      }
      if (conditions['filter-conditioner'] && pin.offer.features.indexOf(filtersMap['filter-conditioner']) === -1) {
        return false;
      }
      return true;
    });

    window.card.remove();
    return newPins.slice(0, 5);

  };

  window.data = {
    getPins: getPins,
    getFilteredPins: getFilteredPins
  };

})();
