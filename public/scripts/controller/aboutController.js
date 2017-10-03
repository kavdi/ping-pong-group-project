'use strict'

var app = app || {};

(function(module){
  const aboutController = {};

  aboutController.index = () => {
    $('#leader-board-table').hide();
    $('#about-page').show();
  };

  module.aboutController = aboutController;

})(app);
