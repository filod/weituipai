define(['jquery', 'backbone', 'views/index-web', 'views/category-web' ,'views/single-video-web' ], 
    function($, Backbone, IndexView, CategoryView , SingleVideoView ) {

    var Router = Backbone.Router.extend({
        initialize: function() {
            Backbone.history.start({
                pushState: true
            });
            var self = this
            self.bind('beforeroute', function() {
                self.activeView.prevScrollTop = $(window).scrollTop()
                self.activeView.$el.hide()
                if(self.activeView.pause) self.activeView.pause()
            })
            $(document).on('click', 'a', $.proxy(this.navToPage,this))
        },
        route: function(route, name, callback) {
            return Backbone.Router.prototype.route.call(this, route, name, function() {
                this.trigger.apply(this, ['beforeroute'].concat(_.toArray(arguments)));
                callback.apply(this, arguments);
            });
        },
        navToPage: function(e) {
            var self = this
            if($(e.currentTarget).hasClass('icon_back')){
                self.navigate($(e.currentTarget).attr('href'), {
                    trigger: true,
                    replace: true
                })
            }else{
                self.navigate($(e.currentTarget).attr('href'), {
                    trigger: true
                })
            }
            return false
        },
        routes: {
            '': 'home',
            'back': 'backHome',
            'c/:category': 'home',
            'categories': 'categories',
            'v/:id': 'singleVideo'
        },
        'home': function(category) {
            this.homeview = new IndexView(category || '', this);
            this.activeView = this.homeview
        },
        'backHome': function() {
            if(this.homeview){
                this.homeview.restore()
                this.activeView = this.homeview
            }else{
                this.home()
            }
        },
        'categories': function() {
            this.categoryview = new CategoryView()
            this.activeView = this.categoryview
        },
        'singleVideo': function(id) {
            if(this.videoview && this.videoview.id ===id ){
                this.videoview.$el.show()
            }else{
                this.videoview = new SingleVideoView(id)
            }
            this.activeView = this.videoview
        }
    });

    // Returns the Router class
    return Router;
});