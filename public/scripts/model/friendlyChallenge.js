'use strict';

var app = app || {};
//NOTE: remember to call function when testing.

(function(module) {
  var friendlyPong = (callback) => {
    $('#player-table').off('click').on('click', '.challengeButton div', (event) => {
      console.log(event);
      $.get('/friendlyChallenge', {challenger: app.Player.localUser, defender: event.target.getAttribute('player-id')}).then(callback);
      app.dashHandler.loadPlayer()
      $('#dash_results').show();
      $('.challengeButton').hide();
    })
  }
  module.friendlyPong = friendlyPong;
})(app)
