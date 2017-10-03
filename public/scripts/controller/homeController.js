'use strict'
var app = app || {};

(function(module){
  const homeController = {};
  homeController.index = () => {
    $('#leader-board-table').show();
    $('#about-page').hide();
  };

  module.homeController = homeController;

})(app);
