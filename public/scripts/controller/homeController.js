'use strict'
console.log("found home controller");

var app = app || {};

(function(module){
  const homeController = {};

  $('#inactive-players').hide();

  homeController.index = () => {
  //
  //init page here
    app.homeView.populateRankings;
  };

  module.homeController = homeController;

})(app);

//app.Article.fetchAll(app.articleView.initIndexPage);
