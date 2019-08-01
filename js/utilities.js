'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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

  window.utilities = {
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    debounce: debounce
  };
})();
