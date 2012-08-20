define(['jquery', 'backbone'],function($, Backbone) {
    var Video = Backbone.Model.extend({

    // Default attributes for the todo
    // and ensure that each todo created has `title` and `completed` keys.
    defaults: {
      title: '默认名',
      category: '默认分类',
      description: '默认说明',
      thumb: '默认.jpg'
    },

    // Toggle the `completed` state of this todo item.
    toggle: function() {
      this.save({
        completed: !this.get('completed')
      });
    }
  });
  return Video
});