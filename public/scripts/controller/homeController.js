'use strict'
var app = app || {};

(function(module){
  const homeController = {};
  homeController.index = () => {
    $('#leader-board-table').fadeIn();
    $('#about-page').hide();
  };

  module.homeController = homeController;

})(app);
