'use strict';

var app = app || {};

(function(module) {
  function Player(name, user_id) {
    this.name = name,
    this.user_id = user_id,
    this.wins = 0,
    this.losses = 0,
    this.games_played =0,
    this.rank = 0,
    this.rival = null
    // this.last_activity = new Date()  // Stretch Goal
  }

  Player.all = [];

  Player.loadPlayers = function(callback){
    $.get('/api/players', function(response) {
      Player.all = response.map(function(player) {return new Player(player)})
    }).then(callback, err => console.error(err, 'error'))
  }
  module.Player = Player
}
)(app)


//// for server.js

APP.get('/api/players', function(req, res){
  CLIENT.query(
    `SELECT (name, user_id, wins, losses, games_played, rank, rival) FROM player;`).then(
      function(data){
        console.log(data)
        res.send(data)
      }
    )
})
