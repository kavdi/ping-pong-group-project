'use strict'

var app = app || {};

(function(module){
  const challengerView = {};
  challengerView.showButtons = function(){
    console.log(app.Challenger.all);
    $('.challengeButton').hide();
    app.Challenger.all.forEach(challenger => {
      $(`.challengeButton[player-id = '${challenger.player_id}']`).show();
    });
  };
  module.challengerView = challengerView;
})(app);
