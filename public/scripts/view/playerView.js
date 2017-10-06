'use strict'

var app = app || {};

(function(module){
  const playerView = {};

  playerView.populatePlayers = function(){
    app.Player.all.forEach(player =>{
      $('#player-table').empty();
      $('#player-table').append(player.toHtml());
    });
  };
  module.playerView = playerView;
})(app);
