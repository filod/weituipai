define(['jquery', 'backbone', 'hogan', 'collections/categories'], 
  function($, Backbone, hogan, Categories) {
  var CategoryView = Backbone.View.extend({
    el: '#main-page',
    tpl: hogan.compile($('#tpl-app').html()),
    tplCategories: hogan.compile($('#tpl-category').html()),
    events: {
    },
    initialize: function() {
      var self = this
      self.categories = new Categories()
      self.categories.fetch().done(function (data) {
        console.log(data);
        self.$section.append(self.tplCategories.render({
          categories:data
        }))
      })
      self.render()
      self.$section = self.$('#video-list')
      // this.model.on('change', this.render, this)
      // this.model.on('sync', this.render, this)
      // this.model.on('destroy', this.remove, this)
      // this.model.on('add', this.toggleEdit, this)
    },
    render: function() {
      this.$el.html(this.tpl.render({
        naver:   'icon_back',
        naverLink : '/'
      })).fadeIn(100)
      return this
    }
  })
  return CategoryView
})