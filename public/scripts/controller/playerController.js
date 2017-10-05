'use strict'
var app = app || {};

(function(module){
  const playerController = {};
  playerController.index = () => {
    $('#leader-board-table').hide();
    $('#about-page').hide();
    $('#player-table').show();
    app.Player.loadPlayers(app.playerView.populatePlayers);
  };

  module.playerController = playerController;

})(app);
