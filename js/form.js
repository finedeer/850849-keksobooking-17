'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');

  var adFormTitle = adForm.querySelector('#title');

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

  var adFormPrice = adForm.querySelector('#price');

  adFormPrice.addEventListener('invalid', function () {
    if (adFormPrice.validity.rangeOverflow) {
      adFormPrice.setCustomValidity('Максимальное значение — 1 000 000');
    } else if (adFormPrice.validity.valueMissing) {
      adFormPrice.setCustomValidity('Обязательное поле');
    } else {
      adFormPrice.setCustomValidity('');
    }
  });

  var prices = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10 000'
  };
  var adFormType = adForm.querySelector('#type');

  adFormPrice.placeholder = prices[adFormType.options[adFormType.selectedIndex].value];
  var synchronizeTypeAndPrice = function (eventForm, formToCange, mapObject) {
    eventForm.addEventListener('change', function (e) {
      formToCange.placeholder = mapObject[e.target.value];
      formToCange.min = mapObject[e.target.value];
    });
  };
  synchronizeTypeAndPrice(adFormType, adFormPrice, prices);

  var adFormTimein = adForm.querySelector('#timein');
  var adFormTimeout = adForm.querySelector('#timeout');
  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');

  var synchronizeTwoForms = function (firstForm, secondForm) {
    firstForm.addEventListener('change', function (e) {
      var targetValue = e.target.value;
      secondForm.value = targetValue;
    });
  };
  synchronizeTwoForms(adFormTimein, adFormTimeout);
  synchronizeTwoForms(adFormTimeout, adFormTimein);

  // вопрос по synchronizeRoomNumAndCapacity ?
  var synchronizeRoomNumAndCapacity = function (firstForm, secondForm) {
    firstForm.addEventListener('change', function (e) {
      var targetValue = e.target.value;
      if (targetValue === '100') {
        secondForm.value = '0';
      } else if (targetValue === '2') {
        secondForm.value = '2' || '1';
      } else if (targetValue === '3') {
        secondForm.value = '2' || '1' || '3';
      } else {
        secondForm.value = targetValue;
      }
    });
  };
  synchronizeRoomNumAndCapacity(adFormRoomNumber, adFormCapacity);

  // adForm.addEventListener('submit', function (evt) {
  //  window.upload(new FormData(adForm));
  //  evt.preventDefault();
  // });

  // Обработка события submit и сброс(тут прям вообще один сплошной вопрос)

  var errorTemplate = document.querySelector('#error');
  var successTemplate = document.querySelector('#success');
  var mapPinsNode = document.querySelector('.map__pins');
  var adFormSubmitButton = document.querySelector('.ad-form__submit');
  var mapFaded = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var adFormReset = document.querySelector('.ad-form__reset');


  var renderMessage = function () {
    var messageNode = successTemplate.cloneNode(true);
    return messageNode;
  };
  var appendMessageToDom = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderMessage());
    main.appendChild(fragment);
  };

  function delitePins() {
    var mapPins = mapPinsNode.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < mapPins.length; j++) {
      mapPinsNode.removeChild(mapPins[j]);
    }
  }


  adForm.addEventListener('submit', function (evt) {
    var formFields = adForm.elements;
    for (var i = 0; i < adForm.length; i++) {
      formFields[i].style.boxShadow = '';
      if (!formFields[i].validity.valid) {
        formFields[i].style.boxShadow = window.constants.ERROR_RED_SHADOW;
        return;
      }
    }
    window.loadUpload.postData(new FormData(adForm), function () {
      adForm.reset();
      mapFaded.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      mapFilters.classList.add('map__filters--disabled');
      window.card.removeCard();
      delitePins();
      window.pin.setAdress(window.pin.pinCords);
      appendMessageToDom(renderMessage());
      synchronizeTypeAndPrice(adFormType, adFormPrice, prices);
      synchronizeRoomNumAndCapacity(adFormRoomNumber, adFormCapacity);
    });
    evt.preventDefault();
  });
})();
