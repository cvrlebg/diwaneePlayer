(function (vjs) {

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
  var defaults = [
    {
      imageSrc: '',
      title: '',
      url: ''
    }
  ];

  vjs.plugin('diwaneeRelated', function (options) {

    if (!options) {
      return;
    }

    var player = this;
    var container = this.el().parentNode;
    var settings = extend({}, defaults, options || {});

    // relateds
    var relatedWrap = document.createElement('div');
    relatedWrap.className = 'vjs-related-wrap';
    var related = "";
    related += "<div class='vjs-related'>";
    related += "<h5><span>فيديوهات ذات صلة</span></h5>";
    for (var i in settings) {
      related += "<a href='" + settings[i].url + "' title='' class='vjs-related-item'>";
      related += "  <div class='vjs-iwrap'>";
      related += "    <img src='" + settings[i].imageSrc + "' class='vjs-related-thumb' alt=''>";
      related += "  </div>";
      related += "  <div class='vjs-overlay'>";
      related += "    <h6>" + settings[i].title + "</h6>";
      related += "  </div>";
      related += "</a>";
    }
    related += "</div>";
    relatedWrap.innerHTML = related;
    player.el().appendChild(relatedWrap);

    // Show / Hide
    var showRelated = function () {
    };
    var hideRelated = function () {
      $(container).removeClass('related');
    };
    player.on('ga-start', function () {
      showRelated = function () {
        console.log('show related');
        $(container).addClass('related');
      };
    });
    player.on('ga-play', function () {
      hideRelated();
    });
    player.on('ga-pause', function () {
      console.log('ga-pause');
      showRelated();
    });


  });
}(window.videojs));



