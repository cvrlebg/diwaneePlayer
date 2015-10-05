$(function () {

  $('.dvjs_video').each(function(i, o) {
    var video = o;
    videojs(video).ready(function() {
      var player = this;
      var options = {
        //vastUrl: 'http://ox-d.clickmena.com/v/1.0/av?auid=537209182',
        remainTxt: 'تخطي الإعلان في %d',
        skipTxt: 'تخطي الإعل'
      };

      kalturaSrc.partnerId = 676152;
      kalturaSrc.getSource(player.el());
      player.playerInit(options);
    });
  });
});