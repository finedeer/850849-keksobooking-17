// Файл data.js
'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
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
  var housingConditioner = mapFilters.querySelector('filter-conditioner');
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
  function getConditions() {
    var conditions = {
      type: housingType.value,
      price: housingPrice.value,
      rooms: housingRooms.value,
      guests: housingGuests.value
    };
    return conditions
  }



  var pins = [];
  function getPins(onGetPins) {
    window.load(function (localPins) {
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

    if (conditions.type) {
      newPins = newPins.filter(function (pin) {
        return pin.type === conditions.type;
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

    return pins.slice(0, 5);
  }

  window.data = {
    getPins: getPins,
    getFilteredPins: getFilteredPins
  };

})();
