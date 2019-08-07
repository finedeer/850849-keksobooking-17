'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var errorTemplate = document.querySelector('#error').content;
  var successTemplate = document.querySelector('#success').content;
  var error = document.querySelector('.error');
  var main = document.querySelector('main');

  var isEnterPressed = function (e) {
    return e.keyCode === ENTER_KEYCODE;
  };
  var isEscPressed = function (e) {
    return e.keyCode === ESC_KEYCODE;
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, window.constants.DEBOUNCE_INTERVAL);
    };
  };

  var showSuccess = function () {
    var messageNode = successTemplate.cloneNode(true);
    main.append(messageNode);
    listenCloseSuccessMessage();
  };

  var removeMessage = function () {
    var successMessage = document.querySelector('main .success');
    var erroreMessage = document.querySelector('main .error');
    if (successMessage) {
      successMessage.remove();
    } else if (erroreMessage) {
      erroreMessage.remove();
    }
  };

  var listenCloseSuccessMessage = function () {
    main.addEventListener('click', function () {
      removeMessage();
    });
    main.addEventListener('keydown', function (e) {
      if (window.utilities.isEscPressed(e)) {
        removeMessage();
      }
    });
  };

  var showError = function () {
    var node = errorTemplate.cloneNode(true);
    var messageNode = node.querySelector('.error__message');
    messageNode.textContent = error;
    main.append(node);
    var errorCloseNode = document.querySelector('.error .error__button');
    listenCloseErrorMessage(errorCloseNode);
  };

  var listenCloseErrorMessage = function (errorButton) {
    main.addEventListener('click', function () {
      removeMessage();
    });
    errorButton.addEventListener('click', function () {
      removeMessage();
    });
    main.addEventListener('keydown', function (e) {
      if (window.utilities.isEscPressed(e)) {
        removeMessage();
      }
    });
    errorButton.addEventListener('keydown', function (e) {
      if (window.utilities.isEscPressed(e)) {
        removeMessage();
      }
    });
  };

  window.utilities = {
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    debounce: debounce,
    onError: showError,
    onSuccess: showSuccess
  };
})();
