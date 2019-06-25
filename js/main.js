'use strict';
// 1.массив объектов
var types = ['palace', 'flat', 'house', 'bungalo'];

var selectRandomValue = function (randomValue) {
  return randomValue[Math.floor(Math.random() * randomValue.length)];
};

var getRandom = function (max, min) {
  return Math.floor(min + Math.random() * (max - min));
};

var getMarks = function () {
  var guideMarks = [];
  for (var i = 0; i <= 7; i++) {
    var mark = {
      'author': {
        'avatar': 'img/avatars/user0' + getRandom(8, 1) + '.png'
      },

      'offer': {
        'type': selectRandomValue(types)
      },

      'location': {
        'x': getRandom(940, 40),
        'y': getRandom(630, 130)
      }
    };
    guideMarks.push(mark);
  }
  return guideMarks;
};

var marks = getMarks();

// 2.Убираем у .map класс .map--faded.
var mapFaded = document.querySelector('.map');
mapFaded.classList.remove('map--faded');

// 3. DOM
var mapPins = document.querySelector('.map-pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map-pin');

var renderPins = function (mark) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = mark.author.avatar;
  pinElement.querySelector('img').alt = mark.offer.type;
  pinElement.querySelector('button').style = '\"left:' + mark.location.x + 'px; top:' + mark.location.y + 'px;\"';
  return pinElement;
};


var fragment = document.createDocumentFragment();
for (var i = 0; i < marks.length; i++) {
  fragment.appendChild(renderPins(marks[i]));
}
mapPins.appendChild(fragment);
