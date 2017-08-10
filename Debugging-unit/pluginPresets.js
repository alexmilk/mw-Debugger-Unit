/**
 * Created by alex.milkis on 01/08/2017.
 */
var plugins = [
    {
        "displayName" : "DoubleClick With Debugging",
        "json" : {
            "DoubleClick": {
                "plugin": true,
                "adTagUrl": "",
                "prerollUrlJs": null,
                "leadWithFlash": true,
                "trackCuePoints": false,
                "debugMode": true, //Should enable debugMode for DoubleClick systems.
                "adsManagerLoadedTimeout": 15000
            },
        }
    } ,
    {
        "displayName" : "loadingSpinner",
        "json" : {
            "loadingSpinner": {
                "imageUrl": "",
                "lines": 10,
                "lineLength": 10,
                "width": 6,
                "radius": 12,
                "corners": 1,
                "rotate": 0,
                "direction": 1,
                "color": "#ff00ff",
                "speed": 1.6,
                "trail": 100,
                "shadow": false,
                "className": "spinner",
                "zIndex": 2000000000,
                "top": "auto",
                "left": "auto",
                "plugin": true
            }
        }
    } ,
    {
        "displayName" : "volumeControl",
        "json" : {
            "volumeControl":{
                "showSlider": true,
                "accessibleControls": false,
                "accessibleVolumeChange": 0.1,
                "plugin": true
            }
        }
    } ,
    {
        "displayName" : "logo",
        "json" : {
            "logo": {
                "plugin" : true,
                "width" : "0%",
                "height" : "0%",
                "includeInLayout" : false,
                "img" : "http://cdnbakmi.kaltura.com/content/uiconf/ps/demos/kdp3/assets/coffee.png",
                "href" : "http://kaltura.com",
                "title" : "my logo"
            }
        }
    },
    {
        "displayName" : "playlistAPI",
        "json" : {
            "playlistAPI": {
                "plugin" : true,
                "autoContinue" : true,
                "autoPlay" : true,
                "autoInsert" : true
            }
        }
    },
    {
        "displayName" : "playlist",
        "json" : {
            "playlist": {
                "plugin" : true,
                "includeInLayout" : true
            }
        }
    }
]
