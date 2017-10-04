'use strict'
var app = app || {};

(function(module){
  const playerController = {};
  playerController.index = () => {
    $('#leader-board-table').hide();
    $('#about-page').hide();
    app.Player.loadPlayers()
  };

  module.playerController = playerController;

})(app);
