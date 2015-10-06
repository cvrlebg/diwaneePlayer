;
(function () {
  "use strict";

  var extend = function (obj) {
    var arg, i, k;
    for (i = 1; i < arguments.length; i++) {
      arg = arguments[i];
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          obj[k] = arg[k];
        }
      }
    }
    return obj;
  };

  var defaults = {
    vastUrl: '',
    debug: false,
    remainTxt: 'Ad will end for %d seconds',
    skipTxt: 'Skip'
  };

  videojs.plugin('playerInit', function (options) {

    if (!options) {
      return;
    }

    var settings = extend({}, defaults, options || {});
    var player = this;
    var classes = player.el().className.split(/\s+/);
    var className = classes[0];

    // due to buggy  behavior  fullscreenApi disabled on Android Tablets in Chrome
    if ($('html').hasClass('ua-visitor-device-tablet') && $('html').hasClass('ua-os-name-android') && $('html').hasClass('ua-browser-name-chrome')) {
      videojs.browser.fullscreenAPI = null;
    }

    if ($('html').hasClass('ua-os-name-android') && !$('html').hasClass('ua-browser-name-chrome')) {
      // Removing buggy  Tap speedup
      videojs.off(player.el(), "tap");
      $('*', player.el()).each(function (i, o) {
        videojs.off(o, "tap");
      });
    }

    // Related videos
    if(window.relatedVideos !== '') {
      player.diwaneeRelated(window.relatedVideos);
    }

    // GA
    if ((typeof _gaq !== 'undefined') || (typeof ga !== 'undefined')) {
      player.diwaneeGa();
    }

    player.muted(true);
    player.usingNativeControls(false);

    //VAST
    ox_vars.init();
    var custVars = ox_vars.setVars();
    var oxParms = custVars !== '' ? '/' + custVars : '';

    player.ads({
      debug: settings.debug
    });

    player.vast({
      url: settings.vastUrl + oxParms,
      skip: 5,
      remainTxt: settings.remainTxt,
      skipTxt: settings.skipTxt
    });

    if ((/MSIE 9/).test(navigator.userAgent)) {
      player.width('100%');
      player.setPreload('auto');
      var vWidth = player.width();
    } else {
      var vWidth = $('.' + className).width();
    }
    var vHeight = (9 * parseInt(vWidth)) / 16;
    player.height(Math.round(vHeight));

    // Player events
    player.on('loadstart', function () {
      //console.log('loadstart');
    });

    player.one('loadstart', function () {
      $(".vjs-poster", player.el()).removeClass('vjs-hidden'); // fixing display:none!imporatnt on poster.vjs-hidden
    });

    player.on('loadeddata', function () {
      //console.log('loadeddata');
    });

    player.on('loadedmetadata', function () {
      //console.log('loadedmetadata);
    });

    var autoplayTimeout = null;

    var autoplayPlay = function () {
      player.play();
      if ((/WOW64; Trident\/7/).test(navigator.userAgent)) {
        player.play();
      }
    }

    var autoplayHandler = function () {
      if (window.setAutoplay) {
        autoplayPlay();
      } else if ($('body').hasClass('tpl-article') && !$('html').hasClass('mobile')) {
        autoplayTimeout = setTimeout(function () {
          autoplayPlay();
        }, 10000);
      }
    };

    // V A S T   R E A D Y   O R   E M P T Y
    player.one("vast-ready", function (e) {
      autoplayHandler();
    });
    // no preroll scenario
    player.one('adscanceled', function (e) {
      autoplayHandler();
    });

    player.on('play', function () {
      //console.log('play');
      clearTimeout(autoplayTimeout);
      player.poster('');
      player.bigPlayButton.hide();
      if (player.ads.state === 'content-playback' || player.ads.state === 'content-resuming') {
        player.controlBar.show();
      }

      // Fix for control bar for android tablet
      if ((/Linux; U; Android/).test(navigator.userAgent)) {
        player.userActive(false);
      }

      if (player.ads.state === undefined || player.ads.state === 'content-playback') {
        if ((/Linux; U; Android/).test(navigator.userAgent)) {
          $('.vjs-control-bar').addClass('show_control_bar');
        }
      }
    });

    player.on('pause', function () {
      //console.log('pause');
      player.bigPlayButton.show();
      if (!player.seeking()) {
        player.controlBar.hide();
      }
    });

    //ads events
    player.on('adsready', function () {
      //console.log('adsready');
      player.loadingSpinner.hide();
      player.bigPlayButton.show();
    });

    player.on('adstart', function () {
      //console.log('adstart');
      player.bigPlayButton.hide();
      player.controlBar.hide();
    });

    player.on('adclick', function () {
      //console.log('adsclick');
      player.bigPlayButton.show();
      player.pause();
    });

  });

})();
