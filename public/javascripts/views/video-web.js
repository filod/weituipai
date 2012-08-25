define(['jquery', 'backbone', 'hogan', 'collections/videos'], function($, Backbone, hogan, Videos) {
  var VideoView = Backbone.View.extend({
    tagName: 'div',
    tpl: hogan.compile($('#tpl-video').html()),
    events: {
    },
    initialize: function() {
    },
    render: function() {
      var view = this.model.toJSON()
      view.statusText = view.status === 'inactive' ? "上架" : "下架"
      this.$el.html(this.tpl.render(view)).addClass('vedi')
      return this
    }
  })
  return VideoView
})