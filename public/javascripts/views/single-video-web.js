define(['jquery', 'backbone', 'hogan', 'models/video'], 
  function($, Backbone, hogan, Video) {
  var SingleVideoView = Backbone.View.extend({
    el: '#video-page',
    tpl: hogan.compile($('#tpl-app').html()),
    tplVideo: hogan.compile($('#tpl-single-video').html()),
    events: {
      'click .play-mask': 'play'
    },
    initialize: function(id) {
      var self = this
      self.video = new Video({
        id: id
      })
      self.video.fetch().done(function () {
        self.$vl.html(self.tplVideo.render(_.extend({notiphone: !navigator.userAgent.match(/iPhone/i)},self.video.toJSON())))
      })
      self.render()
      self.$vl = this.$('#video-list')
    },
    render: function() {
      var self = this
      this.$el.html(this.tpl.render({
        naver:   'icon_back',
        naverLink : '/back'
      })).fadeIn(100)
      return this
    },
    pause: function () {
      this.$('video')[0].pause()
    },
    play: function (e) {
      this.$('video')[0].play()
      $(e.target).hide()
    }
  })
  return SingleVideoView
})