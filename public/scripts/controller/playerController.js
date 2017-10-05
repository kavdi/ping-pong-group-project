'use strict'
var app = app || {};

(function(module){
  const playerController = {};
  playerController.index = () => {
    $('#leader-board-table').hide();
    $('#about-page').hide();
    $('#player-table').show();
    $('.playerContainer').show();
    $('.subTitle').html(`Who's using <em>Pong Me</em>? Check below!`);

    app.Player.loadPlayers(app.playerView.populatePlayers);
  };

  module.playerController = playerController;

})(app);
