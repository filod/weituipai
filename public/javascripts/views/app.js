define(['jquery', 'backbone', 'hogan', 'collections/videos', 'views/video'], 
  function($, Backbone, hogan, Videos, VideoView) {

  var AppView = Backbone.View.extend({
    el: '#admin-page',

    // Our template for the line of statistics at the bottom of the app.
    tpl: hogan.compile($('#tpl-app').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      'click #new-video': 'createNewVideo',
      'click .next-page': 'nextPage',
      'click .prev-page': 'prevPage',
      'keypress .search-query' : 'filterOnEnter',
      'click .search-btn' : 'filter'
    },

    initialize: function(page, router) {
      var self = this;
      this.router = router
      this.videos = new Videos()
      this.videos.on('error', this.error, this);
      this.videos.on('reset', this.addAll, this);
      this.page = page
      // this.category = category
      this.fetchVideo()
      this.render()
      this.$vl = this.$('#video-list')
      this.$sInput = this.$('.search-query')
      this.$el.off('click')
    },
    fetchVideo: function(category) {
      this.videos.fetch({
        data: {
          page: this.page,
          category: this.category
        }
      })
    },
    filter: function () {
      this.category = this.$sInput.val()
      this.fetchVideo(this.category)
    },
    filterOnEnter: function (e) {
      if(e.keyCode === 13){
        this.filter()
      }
    },
    nextPage: function() {
      var self = this
      this.page += 1
      this.$el.fadeOut(100, function() {
        self.router.navigate('/page/'+self.page + '', {
          trigger: true,
          replace: true
        })
      })
      // this.remove()
    },
    prevPage: function() {
      if (this.page === 1) {
        return
      }
      var self = this
      this.page -= 1
      this.$el.fadeOut(100, function() {
        self.router.navigate('/page/'+self.page + '', {
          trigger: true,
          replace: true
        })
      })
      // this.remove()
    },
    render: function() {
      this.$el.html(this.tpl.render({
        page: this.page,
        prev: this.page===1?'disabled':''
      })).fadeIn(100)
    },
    error: function(data) {
      alert(data.msg)
    },
    addOne: function(v) {
      var view = new VideoView({
        model: v
      });
      this.$vl.append(view.render().el);
    },

    addAll: function(e) {
      this.$vl.html('')
      if (this.videos.length === 0) {
        this.$vl.append('<tr><td colspan="7"><h2 style="text-align: center">没有内容</h2></td></tr>')
      } else {
        this.videos.each(this.addOne, this);
      }
    },
    // Generate the attributes for a new Todo item.
    newAttributes: function() {
      return {
        title: "新标题",
        description: "说明"
      };
    },

    createNewVideo: function(e) {
      v = this.videos.create(this.newAttributes());
      var view = new VideoView({
        model: v
      });
      view.render().$el.prependTo(this.$vl);
    }
  });
  return AppView;
});