$(function () {

  $('.dvjs_video').each(function(i, o) {
    var video = o;
    videojs(video).ready(function() {
      var player = this;
      var options = {
        vastUrl: '/vast.xml',
        //vastUrl: 'http://192.168.1.126/vast.xml',
        debug: true,
        remainTxt: 'تخطي الإعلان في %d',
        skipTxt: 'تخطي الإعل'
      };

      kalturaSrc.partnerId = 676152;
      kalturaSrc.getSource(player.el());
      player.playerInit(options);
    });
  });
});