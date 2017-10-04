'use strict';

var app = app || {};

(function(module) {
  function Player(rawData) {
    this.name = rawData.name,
    this.user_id = rawData.player_id,
    this.wins = 0,
    this.losses = 0,
    this.games_played = 0,
    this.rank = 0,
    this.rival = null
    // this.last_activity = new Date()  // Stretch Goal
  }

  Player.all = [];

  Player.loadPlayers = function(){
    $.get('/api/players', function(request, response) {
      console.log(request);
      Player.all = request.map(function(player) {return new Player(player)})
    // }).then(callback, err => console.error(err, 'error'))
    })}
  module.Player = Player
}
)(app)
