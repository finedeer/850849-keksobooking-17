'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormTitle = adForm.querySelector('#title');
  var adFormPrice = adForm.querySelector('#price');
  var adFormType = adForm.querySelector('#type');
  var prices = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10 000'
  };
  var adFormTimein = adForm.querySelector('#timein');
  var adFormTimeout = adForm.querySelector('#timeout');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var roomMapByCapacity = {
    '100': ['0'],
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3']
  };
  var mapFaded = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var resetButton = adForm.querySelector('.ad-form__reset');

  adFormTitle.addEventListener('invalid', function () {
    if (adFormTitle.validity.tooShort) {
      adFormTitle.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (adFormTitle.validity.tooLong) {
      adFormTitle.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (adFormTitle.validity.valueMissing) {
      adFormTitle.setCustomValidity('Обязательное поле');
    } else {
      adFormTitle.setCustomValidity('');
    }
  });

  adFormPrice.addEventListener('invalid', function () {
    if (adFormPrice.validity.rangeOverflow) {
      adFormPrice.setCustomValidity('Максимальное значение — 1 000 000');
    } else if (adFormPrice.validity.valueMissing) {
      adFormPrice.setCustomValidity('Обязательное поле');
    } else {
      adFormPrice.setCustomValidity('');
    }
  });

  adFormPrice.placeholder = prices[adFormType.options[adFormType.selectedIndex].value];
  var synchronizeTypeAndPrice = function (eventForm, formToCange, mapObject) {
    eventForm.addEventListener('change', function (e) {
      formToCange.placeholder = mapObject[e.target.value];
      formToCange.min = mapObject[e.target.value];
    });
  };
  synchronizeTypeAndPrice(adFormType, adFormPrice, prices);

  var synchronizeTwoForms = function (firstForm, secondForm) {
    firstForm.addEventListener('change', function (e) {
      var targetValue = e.target.value;
      secondForm.value = targetValue;
    });
  };
  synchronizeTwoForms(adFormTimein, adFormTimeout);
  synchronizeTwoForms(adFormTimeout, adFormTimein);

  var synchronizeRoomNumAndCapacity = function (firstSelect, secondSelect) {
    firstSelect.addEventListener('change', function (e) {
      var optionsRooms = secondSelect.children;
      for (var i = 0; i < optionsRooms.length; i++) {
        optionsRooms[i].disabled = true;
      }
      var capacity = e.target.value;
      var rooms = roomMapByCapacity[capacity];
      rooms.forEach(function (room) {
        for (var j = 0; j < optionsRooms.length; j++) {
          if (optionsRooms[j].value === room) {
            optionsRooms[j].disabled = false;
          }
        }
      });
      if (rooms.indexOf(secondSelect.value) === -1) {
        secondSelect.value = rooms[0];
      }
    });
  };
  synchronizeRoomNumAndCapacity(adFormRoomNumber, adFormCapacity);

  var disableForm = function () {
    mapFaded.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
  };
  var unableForm = function () {
    mapFaded.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  };

  var resetAll = function () {
    adForm.reset();
    mapFilters.reset();
    disableForm();
    window.card.remove();
    window.pins.delete();
    window.pin.reset();
    adFormPrice.placeholder = '1000';
    window.utilities.onSuccess();
    synchronizeRoomNumAndCapacity(adFormRoomNumber, adFormCapacity);
  };

  resetButton.addEventListener('click', function () {
    resetAll();
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formFields = adForm.elements;
    for (var i = 0; i < adForm.length; i++) {
      formFields[i].style.boxShadow = '';
      if (!formFields[i].validity.valid) {
        formFields[i].style.boxShadow = window.constants.ERROR_RED_SHADOW;
        return;
      }
    }
    window.backend.postData(new FormData(adForm), resetAll, window.utilities.onError);
  });

  window.form = {
    unable: unableForm
  };
})();
