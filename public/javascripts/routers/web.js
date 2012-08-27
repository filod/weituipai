define(['jquery', 'backbone', 'views/index-web', 'views/category-web' ,'views/single-video-web' ], 
    function($, Backbone, IndexView, CategoryView , SingleVideoView ) {
    var Router = Backbone.Router.extend({
        initialize: function() {
            Backbone.history.start({
                pushState: true
            });
            $(document).on('click', 'a', $.proxy(this.navToPage,this))
        },
        navToPage: function(e) {
            var self = this
            self.navigate($(e.currentTarget).attr('href'), {
                trigger: true
            })
            return false
        },
        routes: {
            '': 'home',
            'c/:category': 'home',
            'categories': 'categories',
            'v/:id': 'singleVideo'
        },
        'home': function(category) {
            var indexView = new IndexView(category || '', this);
        },
        'categories': function() {
            var categoryView = new CategoryView()
        },
        'singleVideo': function(id) {
            var singleVideoView = new SingleVideoView(id)
        }
    });

    // Returns the Router class
    return Router;
});