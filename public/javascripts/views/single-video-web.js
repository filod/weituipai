define(['jquery', 'backbone', 'hogan', 'models/video'], 
  function($, Backbone, hogan, Video) {
  var SingleVideoView = Backbone.View.extend({
    el: '#video-page',
    tpl: hogan.compile($('#tpl-app').html()),
    tplVideo: hogan.compile($('#tpl-single-video').html()),
    events: {
    },
    initialize: function(id) {
      var self = this
      self.video = new Video({
        id: id
      })
      self.video.fetch().done(function () {
        self.$vl.html(self.tplVideo.render(self.video.toJSON()))
      })
      self.render()
      self.$vl = this.$('#video-list')
    },
    render: function() {
      this.$el.html(this.tpl.render({
        naver:   'icon_back',
        naverLink : '/'
      })).fadeIn(100)
      return this
    }
  })
  return SingleVideoView
})