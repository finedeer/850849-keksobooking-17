'use strict';

(function () {

  var setup = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.constants.TIMEOUT;

    return xhr;
  };

  var postData = function (data, onSuccess, onError) {
    var xhr = setup(onSuccess, onError);
    xhr.open('POST', window.constants.URL);
    xhr.send(data);
  };
  var getData = function (onSuccess, onError) {
    var xhr = setup(onSuccess, onError);
    xhr.open('GET', window.constants.URL + '/data');
    xhr.send();
  };

  window.backend = {
    postData: postData,
    getData: getData
  };

})();
