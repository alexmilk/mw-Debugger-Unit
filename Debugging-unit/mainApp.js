const playerFrame = document.kPlayer_ifp_ifp;
//kBinds and other functions
kWidget.addReadyCallback(function (playerId) {
    let kdp = document.getElementById(playerId);
    kdp.kBind('playerReady', function () {
        $("#analyticsLog").append(kdp.evaluate("Player Version: " + "{playerVersion}<br>\n")).addClass("greenText");
        $("#analyticsLog").append(kdp.evaluate("Entry Id: " + "{mediaProxy.entry.id}\n<br>")).addClass("greenText");
        kdp.kBind('playerReady', function () {
            $("#analyticsLog").append("Ready to play.<br>").addClass("greenText")
        });
        $("#entrydit").replaceWith(kdp.evaluate("<b>Entry id: </b>" + "<b>{mediaProxy.entry.id}\n</b>"));
        $("#uiconf").replaceWith(kdp.evaluate("<b>Player id: </b>" + "<b>{configProxy.kw.uiConfId}\n</b>"));
        $.loadedTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        $("#loadTime").prepend("Page loaded in " + $.loadedTime + " milliseconds");
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
    kdp.kBind('playerError', function (errorEvent) {
        $("#errorBar").slideDown(300);
        $("#errorBar p").append(" - " + errorEvent.message);
    });
    kdp.kBind('mediaErrorError', function (errorEvent) {
        $("#errorBar").slideDown(300);
        $("#errorBar p").append(" - " + errorEvent.message);
    });
    //OK button handler
    $('#okError').click(function () {
        $('#errorBar').slideUp(300);
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
        let kdp = document.getElementById(playerId);
        let input = document.getElementById("adInput").value;
        kdp.sendNotification("changeMedia", {
            "entryId": input
        });
    })
}
$("#cleanMedia").click(function () {
    kWidget.addReadyCallback(function (playerId) {
        let kdp = document.getElementById(playerId);
        kdp.sendNotification("cleanMedia");
    })
});

function setKS() {
    kWidget.addReadyCallback(function (playerId) {
        let kdp = document.getElementById(playerId);
        let input = document.getElementById("ksInput").value;
        kdp.setKDPAttribute('servicesProxy.kalturaClient', 'ks', input);
    })
}

function doPlay() {
    kWidget.addReadyCallback(function (playerId) {
        let kdp = document.getElementById(playerId);
        kdp.sendNotification("doPlay");
    })
}

function doStop() {
    kWidget.addReadyCallback(function (playerId) {
        let kdp = document.getElementById(playerId);
        kdp.sendNotification("doStop");
    })
}

function callAd() {
    kWidget.addReadyCallback(function (playerId) {
        let adInput = $('#adTagId').val();
        window.open(adInput);
        return false;
    })
}

function changeEmbed() {
    if ($('#customEmbedParams').css("display") == "none") {
        $("#customEmbedParams").slideDown(500);
    }
    else {
        $("#customEmbedParams").slideUp(500);
    }
}
kWidget.addReadyCallback(function (playerId) {
    let kdp = document.getElementById(playerId);
    kdp.kBind('playerReady', function () {
        $.kPlayer = document.kPlayer_ifp_ifp;
        $("#appendJSON").append(JSON.stringify(document.kPlayer_ifp_ifp.kalturaIframePackageData.playerConfig.plugins, null, 2));
        $(".mw-debug-info").append(document.kPlayer_ifp_ifp.kalturaIframePackageData.playerConfig.plugins.debugInfo);
        return false;
    })
});
//        $(document).ready(function () {
//            kWidget.addReadyCallback(function (playerId) {
//                $.kPlayer = document.kPlayer_ifp_ifp;
//                const input = $("#adTagId");
//                input.val(input.val() + $.kPlayer.kalturaIframePackageData.playerConfig.plugins.doubleClick.adTagUrl);
//                return false;
//            })
//        });
// Top menu buttons and logic
$("#removeThumb").click(function () {
    const playerContent = $("#kPlayer_ifp_ifp").contents()[0];
    const playerThumb = $(playerContent).find("#kPlayer_ifp");
    if ($(playerThumb).css("visibility") == 'visible') {
        document.getElementById('removeThumb').textContent = "Show thumbnail";
        $(playerThumb).css("visibility", "hidden");
    }
    else {
        $(playerThumb).css("visibility", "visible");
        document.getElementById('removeThumb').textContent = "Hide thumbnail";
    }
});
$("#removePlay").click(function () {
    const playerContent = $("#kPlayer_ifp_ifp").contents()[0];
    const playButton = $(playerContent).find(".largePlayBtn");
    if ($(playButton).css("display") == 'block') {
        document.getElementById('removePlay').textContent = "Show play button";
        $(playButton).css("display", "none");
    }
    else {
        $(playButton).css("display", "block");
        document.getElementById('removePlay').textContent = "Hide play button";
    }
});
$("#hideControls").click(function () {
    const hideControls = $("#kPlayer_ifp_ifp").contents()[0];
    const controls = window.kPlayer_ifp_ifp.document.querySelector('.controlBarContainer');
    if (controls.style.display == "none") {
        controls.style.display = "block";
        document.getElementById('hideControls').textContent = "Hide controls bar";
    }
    else {
        controls.style.display = "none";
        document.getElementById('hideControls').textContent = "Show controls bar";
    }

});

function goToVast() {
    window.open("https://developers.google.com/interactive-media-ads/docs/sdks/html5/vastinspector?tag=" + document.kPlayer_ifp_ifp.kalturaIframePackageData.playerConfig.plugins.doubleClick.adTagUrl);
}

function getActiveSource() {
    const playerSource = document.kPlayer_ifp_ifp.kPlayer_ifp;
    const currentSource = playerSource.getSource();
    window.location.assign(currentSource.src);
}

function getActiveBitrate() {
    let k = document.kPlayer_ifp_ifp;
    let k2 = k.document.getElementsByClassName('persistentNativePlayer nativeEmbedPlayerPid');
    let sumk = k2.pid_kPlayer_ifp.webkitVideoDecodedByteCount / 1000;
    alert(sumk);
}

function downloadJSON() {
    let jsonContent = document.getElementById('appendJSON');
    window.open('_blank').document.write(jsonContent.innerHTML);
}
$("#getSource").click(function () {
    let playerSources = document.kPlayer_ifp_ifp.kPlayer_ifp.getSources();
    for (let i = 0; i < playerSources.length; i++) {
        parent.document.getElementById('appendStats').append(JSON.stringify(playerSources[i], null, 2));
    }
});
$("#getCaptions").click(function () {
    let playerCaptions = document.kPlayer_ifp_ifp.kPlayer_ifp.mediaElement.getTextTracks();
    for (let i = 0; i < playerCaptions.length; i++) {
        parent.document.getElementById('appendStats').append(JSON.stringify(playerCaptions[i], null, 2));
    }
});
$('button[type=button], input[type=submit]').hover(function () {
    $(this).fadeOut(50);
    $(this).fadeIn(50);
});
$(document).ready(function () {
    $('#topHeaderDiv, #appendStats, #kPlayer_ifp, #mainControlDiv').fadeIn(400);
});
$(document).ready(function() {
    const adSlots = {
        inlinePreroll: {
            "slotType": "Inline preroll",
            "adTagUrl": "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=",
        },
        skippablePreroll: {
            "slotType": "skippable preroll",
            "adTagUrl": "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=",
        }
    };
    for (let prop in adSlots) {
        let str = "lalalala";
        $("#adSlotSelector").append( "<option value='new'>" + adSlots[prop].slotType + "</option>" )
        //adSlots[prop].slotType
    }
});
let tiny = function(){
    window.open("http://tinyurl.com/api-create.php?url="+$(location).attr('href')+$(location).attr('search'), '_blank');
}