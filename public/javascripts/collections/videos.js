define(['jquery', 'backbone', 'models/video'],function($, Backbone, Video) {
  var VideoList = Backbone.Collection.extend({
    model: Video,
    url: '/api/v',
  });

  // Create our global collection of **Todos**.
  return VideoList;

});