$(function () {

  $('.dvjs_video').each(function(i, o) {
    var video = o;
    videojs(video).ready(function() {
      var player = this;
      player.playerInit();

      kalturaSrc.getSource('dvjs_video', 676152);
    });
  });

  /*// due to buggy  behavior  fullscreenApi disabled on Android Tablets in Chrome
  if ($('html').hasClass('ua-visitor-device-tablet') && $('html').hasClass('ua-os-name-android') && $('html').hasClass('ua-browser-name-chrome')) {
    videojs.browser.fullscreenAPI = null;
  }

  $('.dvjs_video').each(function(i,o) {
    
    var video = o;
    
    videojs(video).ready(function () {
      var player = this;
      var excludeAutoplayPages = ['tag', 'photos', 'videos', 'c', 'events'];
      var path = window.location.pathname;
      var urlSegments = path.split('/');
      
      if ( $('html').hasClass('ua-os-name-android') && !$('html').hasClass('ua-browser-name-chrome') ) {
        // Removing buggy  Tap speedup
        videojs.off(player.el(), "tap");
        $('*', player.el()).each(function (i, o) {
          videojs.off(o, "tap");
        });
      }
  
      // RELATAD VIDEOS 
      player.diwaneeRelated(window.relatedVideos);

      // GA
      player.diwaneeGa();

      player.muted(false);
      player.usingNativeControls(false);

      //VAST
      ox_vars.init();
      var custVars = ox_vars.setVars();
      var oxParms = custVars !== '' ? '/' + custVars : '';

      player.ads({
        debug: false
      });

      player.vast({
        url: '/preroll/544403' + oxParms,
        //url: '/preroll/537209182' + oxParms, // preroled
        skip: 5
      });

      if ((/MSIE 9/).test(navigator.userAgent)) {
        player.width('100%');
        var vWidth = player.width();
      } else {
        var vWidth = $('.dvjs_video').width();
      }
      var vHeight = (9 * parseInt(vWidth)) / 16;
      player.height(Math.round(vHeight));

      //player events
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
        //console.log('loadedmetadata');
        if (urlSegments.length > 2 && urlSegments[1] !== '') {
          excludeAutoplayPages.forEach(function (page, v) {
            if (urlSegments[1] === page || $('html').hasClass('mobile')) {
              window.setAutoplay = false;
              return;
            }
          });
        }
      });  

      var autoplayTimeout = null;
      
      var autoplayPlay = function () {
        player.play();
        if ((/WOW64; Trident\/7/).test(navigator.userAgent)) {
          player.play();
        }
      }
      
      var autoplayHandler = function() {
        if (window.setAutoplay) {
          autoplayPlay();
        } else if ($('body').hasClass('tpl-article') && !$('html').hasClass('mobile')) {
          autoplayTimeout = setTimeout(function() {
            autoplayPlay();
          }, 10000);
        }
      };     
      
      // V A S T   R E A D Y   O R   E M P T Y 
      player.one("vast-ready", function(e) {
        autoplayHandler();
      });
      // no preroll scenario
      player.one('adscanceled', function(e) {
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

    *//* obsolite, Removing buggy  Tap speedup
        //fix for android default browser when have preroll
        if(player.ads.state === 'ad-playback' && ((/Linux; U; Android/).test(navigator.userAgent) || (/Linux; Android 4.4.2/).test(navigator.userAgent))
          && player.currentTime() < 1) {

          player.one('pause', function() {
            player.play();
          });
        }
        *//*

        //fix for control bar for android tablet
        if((/Linux; U; Android/).test(navigator.userAgent)) {
          player.userActive(false);
        }

        if (player.ads.state === undefined || player.ads.state === 'content-playback') {
          if((/Linux; U; Android/).test(navigator.userAgent)) {
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
  });*/

});