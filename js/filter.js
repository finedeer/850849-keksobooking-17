// Файл data.js
'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');

  var filtersNodes = [];
  var selectsNodes = mapFilters.querySelectorAll('select');
  var inputsNodes = mapFilters.querySelectorAll('input');
  for (var i = 0; i < selectsNodes.length; i++) {
    filtersNodes.push(selectsNodes[i]);
  }
  for (var j = 0; j < inputsNodes.length; j++) {
    filtersNodes.push(inputsNodes[j]);
  }

  filtersNodes.forEach(function (filterNode) {
    filterNode.addEventListener('change', onFilterUpdate);
  });

  function getConditions() {
    var conditions = {};
    filtersNodes.forEach(function (filterNode) {
      if (filterNode.value) {
        conditions[filterNode.id] = filterNode.value;
      }
    });
    return conditions;
  }

  function onFilterUpdate() {
    window.createPin.appendPinsToDom(window.data.getFilteredPins(getConditions()));
  }

  window.filter = {
    getConditions: getConditions,
    onFilterUpdate: onFilterUpdate
  };
})();
