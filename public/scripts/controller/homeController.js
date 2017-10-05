'use strict'
var app = app || {};

(function(module){
  const homeController = {};
  homeController.index = (ctx) => {
    $('#slackButton').hide();
    $('#player-table').hide();
    $('.navItems a:first').attr('href', `/user/${ctx.params.id}`)
    app.Player.localUser = ctx.params.id;
    $('#leader-board-table').fadeIn(1000);
    $('#about-page').hide();
    $('.playerContainer').hide();
  };

  module.homeController = homeController;

})(app);
