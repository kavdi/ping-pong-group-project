'use strict'
var app = app || {};

(function(module){
  const playerController = {};
  playerController.index = () => {
    $('#leader-board-table').hide();
    $('#about-page').hide();
    $('#player-table').show();
    app.dashHandler.loadPlayer()
    if (app.Player.all.length === 0)app.Player.loadPlayers(app.playerView.populatePlayers);
    else app.playerView.populatePlayers();
  };

  module.playerController = playerController;

})(app);
