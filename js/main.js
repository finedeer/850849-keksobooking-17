'use strict';
// 1.массив объектов
var types = ['palace', 'flat', 'house', 'bungalo'];
var photoNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

var getRandom = function (max, min) {
  return Math.floor(min + Math.random() * (max - min));
};

var shuffle = function (arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};
var uniquePhotoNumbers = shuffle(photoNumbers);

var getMarks = function () {
  var marks = [];
  for (var i = 0; i <= 7; i++) {
    var mark = {
      author: {
        avatar: 'img/avatars/user0' + uniquePhotoNumbers[i] + '.png'
      },

      offer: {
        type: types[getRandom(types.length)]
      },

      location: {
        x: getRandom(940, 40),
        y: getRandom(630, 130),
      }
    };
    marks.push(mark);
  }
  return marks;
};

var marks = getMarks();

// 2.Убираем у .map класс .map--faded.
var mapFaded = document.querySelector('.map');
mapFaded.classList.remove('map--faded');

// 3. DOM
var mapPins = document.querySelector('.map-pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('button');

var renderPins = function (mark) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = mark.author.avatar;
  pinElement.querySelector('img').alt = mark.offer.type;
  pinElement.style.left = mark.location.x + 'px';
  pinElement.style.top = mark.location.y + 'px';
  return pinElement;
};
// var fragment = document.createDocumentFragment();
// for (var i = 0; i < marks.length; i++) {
//  fragment.appendChild(renderPins(marks[i]));
// }
// mapPins.appendChild(fragment);

function getPins() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < marks.length; i++) {
    fragment.appendChild(renderPins(marks[i]));
  }
  return mapPins.appendChild(fragment);
}
getPins();
