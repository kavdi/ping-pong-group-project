'use strict'

var app = app || {};

(function(module){
  const playerView = {};

  playerView.populatePlayers = function(){
    $('#player-table').empty();
    app.Player.all.forEach(player =>{
      $('#player-table').append(player.toHtml());
    });
  };
  module.playerView = playerView;
})(app);
