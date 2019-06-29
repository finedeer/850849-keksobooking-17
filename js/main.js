'use strict';
// 1.массив объектов
var types = ['palace', 'flat', 'house', 'bungalo'];
var photoNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
var PINWIDTH = 40;
var PINHEIGHT = 44;

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
        x: getRandom(900 - PINWIDTH, PINWIDTH),
        y: getRandom(630, 130 + PINHEIGHT),
      }
    };
    marks.push(mark);
  }
  return marks;
};

var marks = getMarks();

// 2.Убираем у .map класс .map--faded.
var mapFaded = document.querySelector('.map');


// 3. DOM
var mapPinsNode = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content;
var pinTemplate = template.querySelector('button');

var renderPins = function (mark) {
  var pinElement = pinTemplate.cloneNode(true);
  var picture = pinElement.querySelector('img');
  picture.src = mark.author.avatar;
  picture.alt = mark.offer.type;
  pinElement.style.left = mark.location.x + 'px';
  pinElement.style.top = mark.location.y + 'px';
  return pinElement;
};
var appendPinsToDom = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPins(pins[i]));
  }
  mapPinsNode.appendChild(fragment);
};


// обработчики событий
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
mapPinMain.addEventListener('click', function () {
  mapFaded.classList.remove('map--faded');
  appendPinsToDom(marks);
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
});
