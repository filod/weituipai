define(['jquery', 'backbone', 'hogan', 'collections/Videos'], function($, Backbone, hogan, Videos) {
  var VideoView = Backbone.View.extend({
    tagName: 'tr',
    tpl: hogan.compile($('#tpl-video').html()),
    events: {
      'click .edit': 'edit',
      'click .destroy': 'destroy',
      'click .save': 'update',
      'click .toggle-status': 'toggleStatus',
      'click .cancel': 'toggleEdit'
    },
    validate: function(attrs) {
      if (true) {
        return "can't end before it starts"
      }
    },
    initialize: function() {
      this.model.on('change', this.render, this)
      this.model.on('sync', this.render, this)
      this.model.on('destroy', this.remove, this)
      // this.model.on('add', this.toggleEdit, this)
    },
    render: function() {
      var view = this.model.toJSON()
      view.statusText = view.status === 'inactive' ? "上架" : "下架"
      this.$el.html(this.tpl.render(view)).toggleClass('inactive',view.status === 'inactive')
      this.$title = this.$('.title input')
      this.$category = this.$('.category input')
      this.$thumb = this.$('.thumb img')
      this.$thumbFile = this.$('.thumb input[type=file]').on('change', $.proxy(this.upload,this))
      this.$videoFile = this.$('.video input[type=file]').on('change', $.proxy(this.upload,this))
      this.$description = this.$('.description textarea')
      return this
    },
    remove: function () {
      this.$el.remove()
    },
    upload: function(e) {
      var self = this
      var file = e.target.files[0]　
      var formData = new FormData()
      formData.append(e.target.name, file)
      $.ajax({
        url: '/api/v/'+this.model.get('id')+'/upload/' + e.target.name,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data) {
          self.model.set(e.target.name,data[e.target.name])
        }
      })
    },
    edit: function() {
      this.toggleEdit()
    },
    destroy: function() {
      this.model.destroy().done(function (data) {
        if(data.code == 0){
          // this.$el
        }
      })
    },
    toggleStatus: function() {
      this.model.set('status',this.model.get('status') === 'inactive'? 'active' :'inactive')
      this.model.save(null,{wait: true})
    },
    update: function() {
      var self = this
      this.model.save({
        title: this.$title.val(),
        category: this.$category.val(),
        description: this.$description.val()
      },{wait: true})
    },
    toggleEdit: function() {
      this.$el.find('div').toggleClass('hide')
      this.$el.toggleClass('editing')
    }
  })
  return VideoView
})