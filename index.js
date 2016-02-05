'use strict';

var getSdk = require('./getSdk');

function loadSdk(options, name) {
    return getSdk(options[name]);
}

function loadSdkPlugin(options) {
    var options = options
    return {
        name: 'LoadSdkPlugin',
        plugContext: function() {
            return {
                plugComponentContext: function(componentContext) {
                    componentContext.loadSdk = loadSdk.bind(null, options);
                },
                plugActionContext: function(actionContext) {
                    actionContext.loadSdk = loadSdk.bind(null, options);
                },
                plugStoreContext: function(storeContext) {
                    storeContext.loadSdk = loadSdk.bind(null, options);
                },
            };
        },
        dehydrate: function() {
            return { options: options };
        },
        rehydrate: function(state) {
            options = state.options;
        }
    };
}

module.exports = loadSdkPlugin;
