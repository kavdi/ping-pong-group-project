'use strict'

var app = app || {};

(function(module){
  const leaderboardView = {};
  leaderboardView.populatePlayers = function(){
    $('#leaderTable').empty();
    app.Player.rankedPlayers().forEach(player =>{
      $('#leaderTable').append(player.rankedToHtml());
    });
    app.Challenger.challengeOptions(app.challengerView.showButtons)
  };
  module.leaderboardView = leaderboardView;
})(app);
