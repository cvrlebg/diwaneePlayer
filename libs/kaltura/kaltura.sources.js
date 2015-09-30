
var kalturaSrc = {
  partnerId : '',

  getSrcForEachElement: function(elClass) {
    var ks = this;
    $(elClass).each(function (k, playerObj) {
      ks.getSource(playerObj);
    });
  },

  getSource: function(el) {
    var obj = $(el);
    var player = obj.find('video');
    var entryId = player.attr('data-entryid');

    kWidget.getSources({
      'partnerId': this.partnerId,
      'entryId': entryId,
      'callback': function (data) {

        $(document).ready(function () {
          var videoData = data.sources;
          var posterImg = data.poster + '/width/800';

          var poster = obj.children('.vjs-poster').css({
            'display': 'block',
            'background-image': 'url(' + posterImg + ')'
          });

          //set attr
          player.attr('title', data.name);
          $('.video_title').html(data.name);

          videoData.forEach(function (k, v) {
            if (k.type === 'video/h264' && (/(a.mp4)/).test(k.src) && !k.isOriginal) {
              var src = $('<source />');
              src.attr('src', k.src);
              src.attr('type', k.type.replace('video/h264', 'video/mp4'));
              player.append(src);
            }
          });

        });
      }
    });
  }
}
