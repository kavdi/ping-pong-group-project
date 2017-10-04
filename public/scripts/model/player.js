'use strict';

var app = app || {};

(function(module) {
  function Player(name, user_id) {
    this.name = name,
    this.user_id = user_id,
    this.wins = 0,
    this.losses = 0,
    this.games_played =0,
    this.rank = 'unranked',
    this.rival = null
  }
  Player.populatePlayers = function(){

  }
  module.Player = Player
}
)(app)
