$(function () {

  $('.dvjs_video').each(function(i, o) {
    var video = o;
    videojs(video).ready(function() {
      var player = this;
      var options = {};

      kalturaSrc.partnerId = 676152;
      kalturaSrc.getSource(player.el());
      player.playerInit(options);
    });
  });
});