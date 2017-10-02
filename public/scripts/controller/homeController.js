'use strict'
console.log("found home controller");

var app = app || {};

(function(module){
  const homeController = {};

  homeController.index = () => {
    $('#test-rows').hide();
  };

  module.homeController = homeController;

})(app);

//app.Article.fetchAll(app.articleView.initIndexPage);
