define(['jquery', 'backbone', 'views/app'], function($, Backbone, AppView) {
    var Router = Backbone.Router.extend({

        initialize: function() {

            Backbone.history.start({pushState: true});

        },
        // All of your Backbone Routes (add more)
        routes: {
            '': 'home',
            'page/:page': 'home'
        },

        'home': function(page) {
            // Instantiating mainView and anotherView instances
            var appView = new AppView(parseInt(page) || 1, this);
        }
    });

    // Returns the Router class
    return Router;
});