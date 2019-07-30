// Файл data.js
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
  var checkCheckedValue = function (targetElement, dataItem) {
   if (targetElement.checked) {
     if (dataItem.offer.features.indexOf(targetElement.value) === -1) {
       return false;
     }
   }
   return true;
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
      for (var key in conditions) {
          if (conditions[key] === 'any') {
            continue;
          }

      if (typeof pin.offer[filtersMap[key]] === 'boolean' && conditions[key]) {
        checkCheckedValue(conditions[key], pin.offer[filtersMap[key]])
      }
}
      /* for (var key in conditions) {
          if (conditions[key] === 'any') {
            continue;
          }
        }
      var conditionsValue = conditions[key];
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
