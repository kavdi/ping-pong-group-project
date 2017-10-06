'use strict'

var app = app || {};

(function(module){
  const challengerView = {};
  challengerView.showButtons = function(){
    console.log(app.Challenger.all);
    $('.challengeButton div').hide();
    app.Challenger.all.forEach(challenger => {
      $(`.challengeButton div[player-id = '${challenger.player_id}']`).show();
    });
  };
  module.challengerView = challengerView;
})(app);
