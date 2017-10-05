'use strict'

var app = app || {};

(function(module){
  const challengerView = {};

  /*
  playerView.populatePlayers = function(){
    //MORE TO FOLLOW
    app.Player.all.forEach(player =>{
      console.log(player);
      $('#player-table').append(player.toHtml());
    });
  };
  */

  challengerView.showButtons = function(){
    app.Challenger.all.forEach(challenger => {
      //show actual button
      /**/
      $(`.challengeButton[player_id = '${challenger['id']}']`).show();
      //default should be hidden

    });
  };


})(app);
