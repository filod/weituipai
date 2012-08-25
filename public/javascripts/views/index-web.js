define(['jquery', 'backbone', 'hogan', 'collections/videos', 'views/video-web'], 
  function($, Backbone, hogan, Videos, VideoView) {

  var AppView = Backbone.View.extend({
    el: '#main-page',
    tpl: hogan.compile($('#tpl-app').html()),
    events: {
      'click .more': 'more'
    },

    initialize: function(category, router) {
      var self = this;
      this.router = router
      this.videos = new Videos()
      this.videos.on('error', this.error, this);
      this.videos.on('reset', this.addAll, this);
      this.page = 1
      this.category = category || '最新'
      this.fetchVideo()
      this.render()
      this.$vl = this.$('#video-list')
      this.$el.off('click')
      this.$more = this.$('.more') 
    },
    fetchVideo: function() {
      return this.videos.fetch({
        data: {
          page: this.page,
          category: this.category
        }
      })
    },
    more: function () {
      var self = this;
      self.page +=1
      self.$more.text('加载中…')
      self.fetchVideo().done(function (data) {
        if(data.length === 0){
          self.$more.text('没有更多了')
        }else{
          self.$more.text('查看更多')
        }
      })
    },
    // navToPage: function(e) {
    //   var self = this
    //   this.$el.slideUp(100, function() {
    //     self.router.navigate($(e.target).attr('href'), {
    //       trigger: true,
    //       replace: true
    //     })
    //   })
    //   return false
    // },
    render: function() {
      this.$el.html(this.tpl.render({
        naver:   'icon_tpy',
        naverLink : 'categories',
        more : true
      })).slideDown(100)
    },
    error: function(data) {
      alert(data)
    },
    addOne: function(v) {
      var view = new VideoView({
        model: v
      });
      this.$vl.append(view.render().el);
    },
    addAll: function(e) {
      this.videos.each(this.addOne,this)
    }
  });
  return AppView;
});