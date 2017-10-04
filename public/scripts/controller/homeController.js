'use strict'
var app = app || {};

(function(module){
  const homeController = {};
  homeController.index = () => {
    $('#slackButton').hide();
    $('#leader-board-table').fadeIn(1000);
    $('#about-page').hide();
  };

  module.homeController = homeController;

})(app);
