define(['jquery', 'backbone', 'hogan', 'collections/Videos'], function($, Backbone, hogan, Videos) {
  var VideoView = Backbone.View.extend({
    tagName: 'tr',
    tpl: hogan.compile($('#tpl-video').html()),
    events: {
      'click .edit': 'edit',
      'click .destroy': 'destroy',
      'keypress .editing': 'update',
      'click .save': 'update',
      'blur .editing': 'close',
      'dblclick .row' : 'edit'
    },

    initialize: function() {
      this.model.on( 'change', this.render, this );
      this.model.on( 'destroy', this.remove, this );
    },
    render: function() {
      this.$el.html(this.tpl.render(this.model.toJSON())).addClass()
      return this
    },
    edit: function() {
      this.$el.find('div').toggleClass('hide')
    },
    destroy: function() {

    },
    update: function() {

    },
    close: function() {
      
    }
  });

  return VideoView;
});