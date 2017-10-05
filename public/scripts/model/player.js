'use strict';

var app = app || {};

(function(module) {
  function Player(rawData) {
    this.name = rawData.name,
    this.user_id = rawData.player_id,
    this.wins = 0,
    this.losses = 0,
    this.games_played = 0,
    this.rank = 11,
    this.rival = null
    // this.last_activity = new Date()  // Stretch Goal
  }

  Player.all = [];

  Player.loadPlayers = function(callback){
    $.get('/api/players', function(request, response) {
      console.log(typeof request);
      Player.all = JSON.parse(request).map(function(player) {return new Player(player)})
    // }).then(callback, err => console.error(err, 'error'))
    }).then(callback);
  }

  Player.prototype.toHtml = function(){
    let template = Handlebars.compile($('#player-template').text());
    var html = template(this);
    return html
  }

  Player.challengeOptions = function(show){
    $.get('/currentPlayer', {challenger: app.Player.localUser}).then(show);
  }

  module.Player = Player
}
)(app)
