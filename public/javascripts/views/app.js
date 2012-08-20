define(['jquery', 'backbone','hogan', 'collections/Videos', 'views/video'], function($, Backbone, hogan, Videos, VideoView) {

  var AppView = Backbone.View.extend({
    el: '#admin-page',

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: hogan.compile($('#tpl-videos').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      'click #new-video': 'createOnEnter'
    },

    initialize: function() {
      var self = this;
      this.videos = new Videos()
      this.videos.on('add', this.addAll, this);
      this.videos.on('reset', this.addAll, this);
      this.videos.on('change', this.addAll, this);
      // this.videos.on('all', this.render, this);

      this.videos.fetch({data: {page: 1}})

      this.$vl = this.$('#video-list')
    },

    render: function() {
      //this.$vl.html(this.statsTemplate.render({videos:this.videos.toJSON()}))
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(v) {
      var view = new VideoView({
        model: v
      });
      this.$vl.append(view.render().el);
    },

    addAll: function(e) {
      this.videos.each(this.addOne, this);
    },

    // Generate the attributes for a new Todo item.
    newAttributes: function() {
      return {
        title: this.input.val().trim(),
        order: app.Todos.nextOrder(),
        completed: false
      };
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.which !== ENTER_KEY || !this.input.val().trim()) {
        return;
      }

      app.Todos.create(this.newAttributes());
      this.input.val('');
    },

    // Clear all completed todo items, destroying their models.
    clearCompleted: function() {
      _.each(window.app.Todos.completed(), function(todo) {
        todo.destroy();
      });

      return false;
    },

    toggleAllComplete: function() {
      var completed = this.allCheckbox.checked;

      app.Todos.each(function(todo) {
        todo.save({
          'completed': completed
        });
      });
    }
  });
  return AppView;
});