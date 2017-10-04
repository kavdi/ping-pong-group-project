'use strict';

var app = app || {};

(function(module) {
  function Player(name, user_id) {
    this.name = name,
    this.user_id = user_id,
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
      // console.log(response);
      // Player.all = response.map(function(player) {return new Player(player)})
    // }).then(callback, err => console.error(err, 'error'))
    })}
  module.Player = Player
}
)(app)


//for server.js

APP.get('/api/players', function(req, res){
  CLIENT.query(
    `SELECT * FROM player;`).then(
    function(data){
      console.log(data.rows)
      // res.send(data)
    }
  )
})

`
  CREATE TABLE IF NOT EXISTS
  player (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    class VARCHAR(250) NOT NULL,
    player_id VARCHAR(250) NOT NULL UNIQUE,
    playerRank VARCHAR(250),
    wins INT,
    losses INT,
    games_played INT,
    RIVAL VARCHAR(250)
  );`


// for routes.js

page('/player-page', app.playerController.index)

// for index.html

  <script src="/scripts/model/player.js"></script>
  <script src="/scripts/controller/playerController.js"></script>
