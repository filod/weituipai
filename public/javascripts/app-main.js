require.config({
  paths: {
      modernizr: "lib/modernizr",
      jquery: "lib/jquery",
      underscore: "lib/underscore",
      backbone: "lib/backbone",
      hogan: "lib/hogan"
  },
  shim: {
      "backbone": {
          deps: ["underscore", "jquery"],
          exports: "Backbone"
      },
      'hogan': {
          exports: "Hogan"  
      }

  } 
});

require(['modernizr','jquery','backbone','routers/web'], function(Modernizr, $, Backbone, Web) {
    var router = new Web();
});
