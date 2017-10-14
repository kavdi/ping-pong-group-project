'use strict';

var app = app || {};

(function(module) {
  var friendlyPong = (callback) => {
    $('#player-table').off('click').on('click', '.challengeButton div', (event) => {
      console.log(event);
      $.get('/friendlyChallenge', {challenger: app.Player.localUser, defender: event.target.getAttribute('player-id')}).then(callback);
      app.dashHandler.loadPlayer()
      $('#dash_friendly').show();
      $('.challengeButton').hide();
    })
  }
  module.friendlyPong = friendlyPong;
})(app)
