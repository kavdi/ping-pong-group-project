'use strict'

var app = app || {};

// change code for player page

(function(module){
  const playerView = {};

  //WILL POPULATE LEADERBOARD RANKINGS
  playerView.populatePlayers = function(){
    //MORE TO FOLLOW
    app.Player.all.forEach(player =>{
      console.log(player);
      $('#player-table').append(player.toHtml());
    });
  };
  module.playerView = playerView;
})(app);
