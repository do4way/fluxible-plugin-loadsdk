# Flxible plugin for client sdk loading

## install
```
napm install --save fluxible-plugin-loadsdk
```

## Usage

```
import loadSdkPlugin from 'fluxible-plugin-loadsdk'

app.plug(loadSdkPlugin{
    gapi: {
        name: 'gapi',
        src: 'https://apis.google.com/js/client.js',
        },
    FB: {
        name: 'FB',
        id: 'facebook-jssdk',
        src: 'https://connect.facebook.net/en_US/sdk.js',
        onLoadFunctionName: 'fbAsyncInit',
    },
})
```
