'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  window.keyboard = {
    isEnterPressed: function (e) {
      return e.keyCode === ENTER_KEYCODE;
    },
    isEscPressed: function (e) {
      return e.keyCode === ESC_KEYCODE;
    }
  };
})();
