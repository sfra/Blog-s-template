function __ajax(_url, _config) {

  var xmlhttp = null,
    config = {},
    url = _url,
    parameters = '';

  var setParameters = function (obj) {

    parameters = '';

    for (var prop in obj) {

      if (obj.hasOwnProperty(prop)) {
        parameters += prop_ + '=' + obj[prop] + '&';
      }
    }
    parameters = parameters.substr(0, parameters.length - 1);
  };

  config.method = (_config === undefined) ? 'GET' : (_config.method || 'POST');


  if (typeof _config !== 'undefined' && typeof _config.parameters !== 'undefined') {
    setParameters(_config.parameters);
  }

  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }



  return {
    setUrl: function (_url) {
      url = _url;
    },
    setParameters: setParameters,
    addParameters: function (params) {
      for (var prop in params) {
        if (params.hasOwnProperty(prop)) {
          parameters += '&' + prop + '=' + params[prop];
        }
      }
    },
    getParameters: function () {
      return parameters;
    },
    setMethod: function (meth) {
      config.method = meth;
    },

    get: function (callback) {

      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200) {
            callback(xmlhttp.responseText);
          } else if (xmlhttp.status === 400) {
            callback('[400]');
          } else {
            callback('[ne 200]');
          }
        }
      };

      xmlhttp.open(config.method, url, true);
      xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xmlhttp.send(parameters);
    }
  };

}