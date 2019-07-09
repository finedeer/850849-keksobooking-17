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


// обработчики событий (module4-task1)
var mapPinMain = document.querySelector('.map__pin--main');
var mapFaded = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var adFormAdress = document.querySelector('#address');

var getCoordinates = function (coordinate, faded) {
  var rect = coordinate.getBoundingClientRect();
  var x = mapFaded.getBoundingClientRect();
  var xCoordinate = Math.round(rect.left - x.left) + (PINWIDTH / 2);
  var yCoordinate = Math.round(rect.top - x.top) + (PINHEIGHT / 2);
  if (!faded) {
    yCoordinate = Math.round(rect.top - x.top) + PINHEIGHT;
  }
  return xCoordinate + ', ' + yCoordinate;
};

adFormAdress.value = getCoordinates(mapPinMain, mapFaded);

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

// максимум подвижности (module5-task1)
function activatePoints() {
  appendPinsToDom(marks);
  mapFaded.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  activated = true;
}
var activated = false;

var areaNode = document.querySelector('.map__overlay');
var areaRect = areaNode.getBoundingClientRect();
var boundSize = {
  width: areaRect.width,
  height: areaRect.height,
};

var pinRect = mapPinMain.getBoundingClientRect();
var pinSize = {
  width: pinRect.left + (PINWIDTH / 2),
  height: pinRect.top + PINHEIGHT,
};
var pinCords = {
  x: pinSize.width,
  y: pinSize.height
};

function validateBound(coords, bound) {
  var newCoords = {
    x: coords.x,
    y: coords.y
  };
  if (newCoords.x >= bound.width - PINWIDTH) {
    newCoords.x = bound.width - PINWIDTH;
  }

  if (newCoords.x < 0) {
    newCoords.x = 0;
  }

  if (newCoords.y >= bound.height) {
    newCoords.y = bound.height - PINHEIGHT;
  }

  if (newCoords.y < 0) {
    newCoords.y = 130;
  }

  return newCoords;
}

function movePoint(newCoords) {
  mapPinMain.style.top = newCoords.y + 'px';
  mapPinMain.style.left = newCoords.x + 'px';
  setAdress(newCoords);
}

function setAdress(coords) {
  adFormAdress.value = coords.x + ', ' + coords.y;
}

mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  if (!activated) {
    activatePoints();
  }

  adFormAdress.value = getCoordinates(mapPinMain);

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var newCoords = {
      x: pinCords.x - shift.x,
      y: pinCords.y - shift.y,
    };

    pinCords = validateBound(newCoords, boundSize);

    movePoint(pinCords);
    setAdress(newCoords);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

  };


  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
