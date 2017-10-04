'use strict'

var app = app || {};

(function(module){
  const aboutController = {};

  aboutController.index = () => {
    $('#leader-board-table').hide();
    $('#about-page').fadeIn(1000);
  };

  module.aboutController = aboutController;

})(app);
