// Файл data.js
'use strict';
(function () {
  var ads = [];
  // Кэширование даннных с сервера в массив announcements
  var setAds = function (data) {
    ads = data;
    window.createPin.appendPinsToDom(ads.slice(0, 5));
  };

  window.render = {
    setAds: setAds
  };

})();

/* (function () {
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var photoNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

  var getRandom = function (max, min) {
    if (min === undefined) {
      min = 0;
    }
    return Math.floor(min + Math.random() * (max - min));
  };

  var shuffle = function (arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
      var j = getRandom(i);
      var temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };
  var shuffledPhotoNumbers = shuffle(photoNumbers.slice());
  var getMarks = function () {
    var marks = [];
    for (var i = 0; i <= 7; i++) {
      var mark = {
        author: {
          avatar: 'img/avatars/user0' + shuffledPhotoNumbers[i] + '.png'
        },

        offer: {
          type: types[getRandom(types.length)]
        },

        location: {
          x: getRandom(900 - window.constants.PINWIDTH, window.constants.PINWIDTH),
          y: getRandom(630, 130 + window.constants.PINHEIGHT),
        }
      };
      marks.push(mark);
    }
    return marks;
  };
  var marks = getMarks();

  window.data = {
    marks: marks,
  };
})();*/
