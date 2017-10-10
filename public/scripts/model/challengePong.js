'use strict';

var app = app || {};

(function(module){
  var challengePong = (callback) => {
    $('#leaderTable').off('click').on('click', '.challengeButton div', (event) => {
      $.get('/challenge', {challenger: app.Player.localUser, defender: event.target.getAttribute('player-id')}).then(callback);
      app.dashHandler.loadPlayer()
      $('#dash_results').show();
      $('.challengeButton').hide();
    })
  }
  module.challengePong = challengePong;
})(app)
