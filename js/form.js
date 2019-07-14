'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');


  // доверяй, но проверяй (module4-task2)
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

  var synchronizeTwoForms = function (firstForm, secondForm) {
    firstForm.addEventListener('change', function (e) {
      var targetValue = e.target.value;
      secondForm.value = targetValue;
    });
  };
  synchronizeTwoForms(adFormTimein, adFormTimeout);
  synchronizeTwoForms(adFormTimeout, adFormTimein);


  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm));
    evt.preventDefault();
  });
})();
