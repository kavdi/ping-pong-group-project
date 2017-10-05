'use strict'

var app = app || {};

(function(module){
  const aboutController = {};

  aboutController.index = () => {
    $('#slackButton').hide();
    $('#leader-board-table').hide();
    $('#player-table').hide();
    $('#about-page').fadeIn(1000);
    $('.playerContainer').hide();
  };

  module.aboutController = aboutController;

})(app);
