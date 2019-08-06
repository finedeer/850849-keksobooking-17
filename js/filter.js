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

  var getConditions = function () {
    var conditions = {};
    filtersNodes.forEach(function (filterNode) {
      if (filterNode.type === 'checkbox') {
        conditions[filterNode.id] = filterNode.checked;
      } else {
        conditions[filterNode.id] = filterNode.value;
      }
    });
    return conditions;
  };

  function onFilterUpdate() {
    window.utilities.debounce(window.pins.appendToDom(window.data.getFilteredPins(getConditions())));
  }

  window.filter = {
    getConditions: getConditions
  };
})();
