(function() {

  videojs.plugin('diwaneeGa', function(options) {


    var player = this;
    var video = this.el();
    

    var eventName = "Video";
    var eventLabel;
    player.on('loadeddata', function() {
      eventLabel = $(video).data('entryid') + " - " + $(video).children('video').attr('title');
    });


    // playing preroll
    player.on("vast-ready", function(e) {
      if (!player.paused()) {
        _gaq.push(['_trackEvent', eventName, 'startPreroll', eventLabel]);
      }
      else {
        player.one('play', function() {
          _gaq.push(['_trackEvent', eventName, 'startPreroll', eventLabel]);
        });
      }
    });


    // playing / ending main video
    player.on("play", function(e) {
      if (player.ads.state === "content-resuming" || player.ads.state === "content-playback") {
        //console.log(player.ads);
        procentBeaconEnabled = true;
        if (!player.paused()) {
          player.trigger('ga-start');
          _gaq.push(['_trackEvent', eventName, 'start', eventLabel]);          
        }
        else {
          player.one('play', function() {
            player.trigger('ga-start');
            _gaq.push(['_trackEvent', eventName, 'start', eventLabel]);
          });
        }
      }

      if (e.type === "ended") {
        console.log('ga-ended');
        _gaq.push(['_trackEvent', eventName, 'ended', eventLabel]);
      }

      if (!player.seeking() || ended) {
        console.log('play-ga');
        ended = false;
        player.trigger('ga-play');
        _gaq.push(['_trackEvent', eventName, 'play', eventLabel]);
      }
    });


    // play / stop
    var ended = false; // fix for replay seek
    
    /*player.on('play', function() {

     });*/

    player.on('pause', function() {
      if (!player.seeking()) {
        player.trigger('ga-pause');
        _gaq.push(['_trackEvent', eventName, 'pause', eventLabel]);
      }
    });    
    player.on('ended', function() {
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