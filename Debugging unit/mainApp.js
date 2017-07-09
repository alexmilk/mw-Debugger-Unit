/**
 * Created by alex.milkis on 09/07/2017.
 */
//kBinds and other functions
kWidget.addReadyCallback(function (playerId) {
    var kdp = document.getElementById(playerId);
    kdp.kBind('playerReady', function () {
        $("#analyticsLog").append(kdp.evaluate("Player Version: " + "{playerVersion}<br>\n")).addClass("greenText");
        $("#analyticsLog").append(kdp.evaluate("Entry Id: " + "{mediaProxy.entry.id}\n<br>")).addClass("greenText");
        kdp.kBind('playerReady', function () {
            $("#analyticsLog").append("Ready to play.<br>").addClass("greenText")
        });
        $("#entrydit").replaceWith(kdp.evaluate("<b>Entry id: </b>" + "<b>{mediaProxy.entry.id}\n</b>"));
        $("#uiconf").replaceWith(kdp.evaluate("<b>Player id: </b>" + "<b>{configProxy.kw.uiConfId}\n</b>"));
        $.loadedTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart;
        $("#loadTime").append("Page loaded in " + $.loadedTime + " milliseconds");
    });

    kdp.kBind('mediaReady', function () {
        $("#analyticsLog").append("Media Ready\n<br>").addClass('greenText');
    });
    kdp.kBind('adEnd', function () {
        $("#analyticsLog").append("Ad Ended\n<br>").addClass('greenText');
    });
    kdp.kBind('postSequenceStart', function () {
        $("#analyticsLog").append("Post Sequence Started\n<br>").addClass('greenText');
    });
    kdp.kBind('firstPlay', function () {
        $("#analyticsLog").append("First Play\n<br>").addClass('greenText');
    });
    kdp.kBind('doPause', function () {
        $("#analyticsLog").append("Player Paused\n<br>").addClass("greenText");
    });
    kdp.kBind('doPlay', function () {
        $("#analyticsLog").append("Player Playing\n<br>").addClass("greenText");
    });
    kdp.kBind('mediaError', function () {
        $("#analyticsLog").append("Media Error\n<br>").addClass("greenText");
    });
    kdp.kBind('bumperStarted', function () {
        $("#analyticsLog").append("Bumper Started\n<br>").addClass("greenText");
    });
    kdp.kBind('postSequenceStart', function () {
        $("#analyticsLog").append("Playing Post Sequence.\n<br>").addClass("greenText");
    })
});

//The mainBrain
function setEntry() {
    kWidget.addReadyCallback(function (playerId) {
        var kdp = document.getElementById(playerId);
        var input = document.getElementById("adInput").value;
        kdp.sendNotification("changeMedia", {"entryId": input});
    })
}
$("#cleanMedia").click(function () {
    kWidget.addReadyCallback(function (playerId) {
        var kdp = document.getElementById(playerId);
        kdp.sendNotification("cleanMedia");
    })
})
function setKS() {
    kWidget.addReadyCallback(function (playerId) {
        var kdp = document.getElementById(playerId);
        var input = document.getElementById("ksInput").value;
        kdp.setKDPAttribute('servicesProxy.kalturaClient', 'ks', input);
    })
}
function doPlay() {
    kWidget.addReadyCallback(function (playerId) {
        var kdp = document.getElementById(playerId);
        kdp.sendNotification("doPlay");
    })
}
function doStop() {
    kWidget.addReadyCallback(function (playerId) {
        var kdp = document.getElementById(playerId);
        kdp.sendNotification("doStop");
    })
}
function callAd() {
    kWidget.addReadyCallback(function (playerId) {
        $.kPlayer = document.kPlayer_ifp_ifp;
        window.open($.kPlayer.kalturaIframePackageData.playerConfig.plugins.doubleClick.adTagUrl);
        return false;
    })}
$( document ).ready(function (){
    var msg = $.ajax({type: "GET", url: "https://tinyurl.com/api-create.php?url=" + document.location.href, async: false}).responseText;
    $("#tinyUrl").append(msg);
    return false;
});

kWidget.addReadyCallback(function (playerId) {
    var kdp = document.getElementById(playerId);
    kdp.kBind('playerReady', function () {
        $.kPlayer = document.kPlayer_ifp_ifp;
        $("#appendHtml").append(JSON.stringify(document.kPlayer_ifp_ifp.kalturaIframePackageData.playerConfig.plugins, null, 2));
        $(".mw-debug-info").append(document.kPlayer_ifp_ifp.kalturaIframePackageData.playerConfig.plugins.debugInfo);
        return false;
    })});
$( document ).ready(function() {
    kWidget.addReadyCallback(function (playerId) {
        $.kPlayer = document.kPlayer_ifp_ifp;
        var input = $("#adTagId");
        input.val( input.val() + $.kPlayer.kalturaIframePackageData.playerConfig.plugins.doubleClick.adTagUrl);
        return false;
    })});
// Top menu buttons and logic
$("#removeThumb").click(function() {
    var kPlayerContent = $("#kPlayer_ifp_ifp").contents()[0];
    $(kPlayerContent).find("#kPlayer_ifp").css("visibility", "hidden");
});
$("#removePlay").click(function(){
    var playButton = $("#kPlayer_ifp_ifp").contents()[0];
    $(playButton).find(".largePlayBtn").css("visibility", "hidden");
});
$("#hideControls").click(function() {
    const hideControls = $("#kPlayer_ifp_ifp").contents()[0];
    const controls = window.kPlayer_ifp_ifp.document.querySelector('.controlBarContainer');
    if (controls.style.display == "none") {
        controls.style.display = "block";
        document.getElementById('hideControls').textContent = "Hide controls bar";
    } else {
        controls.style.display = "none";
        document.getElementById('hideControls').textContent = "Show controls bar";
    }

});
function goToVast() {
    let k = document.kPlayer_ifp_ifp;
    let vastWindow = window.open("https://developers.google.com/interactive-media-ads/docs/sdks/html5/vastinspector?tag=" + k.kalturaIframePackageData.playerConfig.plugins.doubleClick.adTagUrl);
    $(vastWindow).ready(function() {
        document.getElementById('test-ad-button').click();
    })};

$("#getSource").click(function (){
    var playerSources = document.kPlayer_ifp_ifp.kPlayer_ifp.getSources();
    for (var i = 0; i < playerSources.length; i++) {
        parent.document.getElementById('appendStats').append(JSON.stringify(playerSources[i], null, 2));
    }
});

$("#getCaptions").click(function (){
    var playerCaptions = document.kPlayer_ifp_ifp.kPlayer_ifp.mediaElement.getTextTracks();
    for (var i = 0; i < playerCaptions.length; i++) {
        parent.document.getElementById('appendStats').append(JSON.stringify(playerCaptions[i], null, 2));
    }
});
$('button[type=button], input[type=submit]').hover(function() {
    $( this ).fadeOut( 50 );
    $( this ).fadeIn( 50 );
});