
define([], function () {
  'use strict';
  function __ajax(_url, _config) {

    let xmlhttp, config = {}, url = _url, parameters = '';

    let setParameters = (obj) => {

      parameters = '';

      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          parameters += `${prop}=${obj[prop]}&`;
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

    
    let promise = null;

    return {
    
      setUrl: (_url) => {
        url = _url;
      },

      setParameters: setParameters,
    
      addParameters: (params)=>{
    
        for(let prop in params) {
          if(params.hasOwnProperty(prop)) {
            parameters+=`&${prop}=${params[prop]}`;
          }
        }
      },
    
      getParameters: ()=> {
        return parameters;
      },
    
      setMethod: (meth)=>{
        config.method =meth;
      },

      get: ()=> {
        promise = new Promise((res, rej)=> {

          xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
              if (xmlhttp.status === 200) {
                res(xmlhttp.responseText);
              } else if (xmlhttp.status === 400) {
                rej('[400]');
              } else {
                rej('[ne 200]');
              }
            }
          };

          xmlhttp.open(config.method, url, true);
          xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xmlhttp.send(parameters);

        });

        return promise;

      }
    };

  }

    return __ajax;

});
