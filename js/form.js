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
      console.log(optionsRooms)
      for (var i = 0; i < optionsRooms.length; i++) {
        optionsRooms[i].disable = true;
      }
      var capacity = e.target.value;
      var rooms = roomMapByCapacity[capacity];
      rooms.forEach(function () {
        for (var j = 0; j < optionsRooms.length; j++) {
          if (optionsRooms[i].disable === rooms) {
            optionsRooms[i].disable = false;
          }
        }
      });
    });
  };
  synchronizeRoomNumAndCapacity(adFormRoomNumber, adFormCapacity);


  // Обработка события submit и сброс
  var errorTemplate = document.querySelector('#error').content;
  var successTemplate = document.querySelector('#success').content;
  var mapFaded = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var main = document.querySelector('main');
  var successMessage = document.querySelector('.success');


  var renderSuccessMessage = function () {
    var messageNode = successTemplate.cloneNode(true);
    return messageNode;
  };

  var appendMessageToDom = function (renderMessage) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderMessage);
    main.appendChild(fragment);
  };

  function removeMessage(message) {
    if (message) {
      message.parentElement.removeChild(message);
    }
  }

  var listenCloseSuccessMessage = function () {
    main.addEventListener('click', function () {
      removeMessage(successMessage);
    });
    main.addEventListener('keydown', function (e) {
      if (window.utilities.isEscPressed(e)) {
        removeMessage(successMessage);
        window.pin.activatePoints();
      }
    });
  };

  /* var rendErerrorMessage = function (errorMessage) {
    var messageNode = errorTemplate.cloneNode(true);
    messageNode.textContent = errorMessage;
    return messageNode;
  };*/
  var onError = function (errorMessage) {
    var node = errorTemplate.cloneNode(true);
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(main, node);
  };

  adForm.addEventListener('submit', function (evt) {
    var formFields = adForm.elements;
    for (var i = 0; i < adForm.length; i++) {
      formFields[i].style.boxShadow = '';
      if (!formFields[i].validity.valid) {
        formFields[i].style.boxShadow = window.constants.ERROR_RED_SHADOW;
        return;
      }
    }
    window.backend.postData(new FormData(adForm), function () {
      adForm.reset();
      mapFaded.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      mapFilters.classList.add('map__filters--disabled');
      window.card.removeCard();
      window.createPin.deletePins();
      window.pin.resetPin();
      adFormPrice.placeholder = '1000';
      appendMessageToDom(renderSuccessMessage());
      successMessage = document.querySelector('.success');
      listenCloseSuccessMessage(successMessage);
      window.backend.getData(onError); // что-то совсем не то
    });
    evt.preventDefault();
  });

})();
