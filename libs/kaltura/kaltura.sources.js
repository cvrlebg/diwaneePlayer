/*
$(function () {
  $('.dvjs_video').each(function (k, playerObj) {
    console.log($(this));
    var id = playerObj.attributes[0].nodeValue + '_html5_api'; //on mobile devices cant find element
    var player = $(this);
    var entryId = player.attr('data-entryid');
    console.log(entryId);

    kWidget.getSources({
      'partnerId': 676152,
      'entryId': entryId,
      'callback': function (data) {
        console.log(player);
        $(document).ready(function () {

          if ($('html').hasClass('mobile') || $('html').hasClass('ua-visitor-device-tablet')) {
            var videoData = data.sources;
            player = $('#' + id);

          } else if ($('body').hasClass('tpl-homepage') || $('body').hasClass('page-slideshows') ||
            $('body').hasClass('page-videos') || $('body').hasClass('page-events')) {
            var videoData = data.sources;
          } else {
            var videoData = data.sources.reverse();
          }

          var posterImg = data.poster + '/width/800';
          var poster = player.parent().children('.vjs-poster').css({
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
  });
});*/

var kalturaSrc = {
  getSource: function(selector, partnerId) {
    $('.' + selector).each(function (k, playerObj) {

      var obj = $(this);
      var player = obj.find('video');
      var entryId = player.attr('data-entryid');

      kWidget.getSources({
        'partnerId': partnerId,
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
    });
  }
}
