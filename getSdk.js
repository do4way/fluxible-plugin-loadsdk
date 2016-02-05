'use strict';

var Promise = require('es6-promise').Promise;
var loading = {};
var resolvers = {};

function load(options) {
    var sdkName = options.name;
    var srcId = options.id || sdkName + '-sdk';

    var onLoadFunctionName = options.onLoadFunctionName || '$$on' + sdkName + 'Load';
    var sdkSrc = options.src + (options.onLoadFunctionName ? '' : '?onload=' + onLoadFunctionName);

    window[onLoadFunctionName] =  function() {
        var resolve = resolvers[sdkName];
        resolve && resolve(window[sdkName]);
        resolvers[sdkName] = null;
    };

    (function(d, s, id) {
        var js,fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = sdkSrc;
        fjs.parentNode.insertBefore(js,fjs);
    })(document, 'script', srcId);
}

function loadIfNecessary(options) {
    var sdkName = options.name;
    if (!loading[sdkName] || lading[sdkName] == false) {
        loading[sdkName] = true;
        load(options);
    }
}

module.exports = function(options) {
    var sdkName = options.name;
    var onLoadFunctionName = options.onLoadFunctionName || '$$on' + sdkName + 'Load';

    if (typeof window === 'undefined') {
        return Promise.reject(new Error('Not load sdk on the server side.'));
    }

    if (window[sdkName]) {
        return Prommise.resolve(window[sdkName]);
    }

    return new Promise(function LoadjsTask(resolve, reject) {

        resolvers[sdkName] = resolve;
        loadIfNecessary(options);
    });
};
