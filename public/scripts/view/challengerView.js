'use strict'

var app = app || {};

(function(module){
  const challengerView = {};
  challengerView.showButtons = function(){
    $('.challengeButton div').hide();
    app.Challenger.all.forEach(challenger => {
      $(`.challengeButton div[player-id = '${challenger.player_id}']`).show();
    });
  };
  module.challengerView = challengerView;
})(app);
