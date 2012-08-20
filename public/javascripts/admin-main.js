require.config({
  
  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.7.2.min")
  paths: {
      // Core Libraries
      modernizr: "lib/modernizr",
      jquery: "lib/jquery",
      underscore: "lib/underscore",
      backbone: "lib/backbone",
      hogan: "lib/hogan"
  },
  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {
      "backbone": {
          deps: ["underscore", "jquery"],
          exports: "Backbone"  //attaches "Backbone" to the window object
      },
      'hogan': {
          exports: "Hogan"  
      }

  } // end Shim Configuration
  
});

// Include Desktop Specific JavaScript files here (or inside of your Desktop router)
require(['modernizr','jquery','backbone','routers/admin'], function(Modernizr, $, Backbone, Admin) {

    // Instantiates a new Router
    this.router = new Admin();
});
