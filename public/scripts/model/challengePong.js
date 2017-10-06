'use strict';

var app = app || {};

(function(module){
  var challengePong = (callback) => {
    $('#leaderTable').off('click').on('click', '.challengeButton', function(){
      console.log(app.Player.localUser);
      console.log($(this).attr('player-id'))
      $.get('/challenge', {challenger: app.Player.localUser, defender: $(this).attr('player-id')}).then(callback);
    })
  }
  module.challengePong = challengePong;
})(app)
