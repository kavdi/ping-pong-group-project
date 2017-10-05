'use strict'

var app = app || {};

(function(module){
  const challengerView = {};
  challengerView.showButtons = function(){
    app.Challenger.all.forEach(challenger => {
      //show actual button
      $(`.challengeButton[player_id = '${challenger['id']}']`).show();
    });
  };


})(app);
