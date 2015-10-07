(function() {

  videojs.plugin('diwaneeGa', function(options) {


    var player = this;
    var video = this.el();

    var prerollStarted = false;
    var prerollSkipped = false;
    var prerollEnd = false;

    var eventName = "Video";
    var eventLabel;

    player.on('loadeddata', function() {
      //console.log(player);
      eventLabel = $(video).data('entryid') + " - " + $(video).children('video').attr('title');
    });

    // playing preroll
    player.on("vast-ready", function(e) {
      prerollStarted = true;
      if (!player.paused()) {
        _gaq.push(['_trackEvent', eventName, 'startPreroll', eventLabel]);
      }
      else {
        player.one('play', function() {
          _gaq.push(['_trackEvent', eventName, 'startPreroll', eventLabel]);
        });
      }

      player.on('adclick', function() {
        //console.log('adclick');
        _gaq.push(['_trackEvent', eventName, 'clickedPreroll', eventLabel]);
      });

      player.on('adskipped', function() {
        //console.log('adskipped');
        prerollSkipped = true;
        _gaq.push(['_trackEvent', eventName, 'skippedPreroll', eventLabel]);
      });

      player.on('adend', function(e) {
        if(!prerollSkipped) {
          _gaq.push(['_trackEvent', eventName, 'endPreroll', eventLabel]);
        }
        prerollStarted = false;
        prerollEnd = true;
      });
    });

    // playing / ending main video
    player.on("contentplay", function(e) {
      //console.log(e);
      //console.log('contentplay');
      procentBeaconEnabled = true;
      prerollEnd = true;

      if (!player.paused()) {
        player.trigger('ga-start');
        _gaq.push(['_trackEvent', eventName, 'start', eventLabel]);
      }
      else {
        player.one('play', function() {
          //console.log('content-play-one');
          player.trigger('ga-start');
          _gaq.push(['_trackEvent', eventName, 'start', eventLabel]);
        });
      }
    });

    // play / stop
    var ended = false; // fix for replay seak

    player.on('play', function(e) {
      if (!player.seeking() || ended) {
        //console.log(e);
        ended = false;
        player.trigger('ga-play');
        if(!prerollStarted) {
          _gaq.push(['_trackEvent', eventName, 'play', eventLabel]);
        }
      }
    });

    player.on('pause', function(e) {
      //console.log('pause');
      if (!player.seeking() && prerollEnd) {
        player.trigger('ga-pause');
        _gaq.push(['_trackEvent', eventName, 'pause', eventLabel]);
      }
    });

    player.on('contentended', function() {
      //console.log('ended');
      _gaq.push(['_trackEvent', eventName, 'ended', eventLabel]);
      ended = true;
    });

    // procentage 
    var lastBeacon = 0;
    var procentBeaconEnabled = false;
    player.on('timeupdate', function(e) {
      if (!procentBeaconEnabled) {
        return;
      }
      var currentTime = Math.round(player.currentTime());
      var duration = Math.round(player.duration());
      var percentPlayed = Math.floor((currentTime / duration) * 100);
      if (Math.floor(percentPlayed / 10) > lastBeacon) {
        lastBeacon = Math.round(percentPlayed / 10);
        _gaq.push(['_trackEvent', eventName, "percent" + String(lastBeacon * 10), eventLabel]);
      }
    });

    // seek
    var seek = false;
    player.on('seeking', function(e) {
      if (seek === false) {
        procentBeaconEnabled = false;
        seek = true;
      }
    });

    player.on('play', function(e) {
      if (seek === true) {
        seek = false;
        _gaq.push(['_trackEvent', eventName, 'seek', eventLabel]);
      }
    });

    // fullscreen
    player.on('fullscreenchange', function(e) {
      if (player.isFullscreen()) {
        _gaq.push(['_trackEvent', eventName, 'fullscreen', eventLabel]);
      }
    });

    // related
    $(".vjs-related-item", video).click(function(){
      _gaq.push(['_trackEvent', eventName, 'related-video-click', eventLabel]);
    });

  });


})();