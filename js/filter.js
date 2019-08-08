'use strict';
(function () {
  var mapFilter = document.querySelector('.map__filters');

  var filtersNodes = [];
  var selectsNodes = mapFilter.querySelectorAll('select');
  var inputsNodes = mapFilter.querySelectorAll('input');
  for (var i = 0; i < selectsNodes.length; i++) {
    filtersNodes.push(selectsNodes[i]);
  }
  for (var j = 0; j < inputsNodes.length; j++) {
    filtersNodes.push(inputsNodes[j]);
  }

  var debounceOnUpdateFilter = window.utilities.debounce(updateFilter);

  filtersNodes.forEach(function (filterNode) {
    filterNode.addEventListener('change', debounceOnUpdateFilter);
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

  function updateFilter() {
    window.pins.appendToDom(window.data.getFilteredPins(getConditions()));
  }

  window.filter = {
    getConditions: getConditions
  };
})();
