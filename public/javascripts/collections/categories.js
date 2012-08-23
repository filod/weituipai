define(['jquery', 'backbone', 'models/category'],function($, Backbone, Category) {
  var Categories = Backbone.Collection.extend({
    model: Category,
    url: '/api/categories',
  });
  return Categories;
});