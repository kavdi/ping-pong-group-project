'use strict';

var app = app || {};

(function(module) {
  function Player(rawData) {
    this.name = rawData.name,
    this.user_id = rawData.player_id,
    this.wins = rawData.wins,
    this.losses = rawData.losses,
    this.games_played = rawData.games_played,
    this.rank = rawData.rank,
    this.challenged = rawData.challenged, //NOTE: 0 = false / 1 = true
    this.opp_id = rawData.opp_id
  }

  Player.all = [];

  Player.loadPlayers = function(callback){
    $.get('/api/players', function(request, response) {
      console.log(typeof request);
      Player.all = JSON.parse(request).map(function(player) {return new Player(player)})
    // }).then(callback, err => console.error(err, 'error'))
    }).then(callback);
  }

  Player.rankedPlayers = function(){
    return Player.all.sort((player1, player2)=>player1.rank - player2.rank).slice(0,10);
  }

  Player.prototype.toHtml = function(){
    let template = Handlebars.compile($('#player-template').text());
    var html = template(this);
    return html
  }

  Player.prototype.rankedToHtml = function(){
    let template = Handlebars.compile($('#leader-board-template').text());
    var html = template(this);
    return html
  }

  //assume winner is known
  Player.swapRank = function(playerOneData,playerTwoData){
    let swap = 0;

    swap = playerTwoData.rank;
    playerTwoData.rank = playerOneData.rank;
    playerOneData.rank = swap;

    //put request
    $.ajax({
      url: '/changeRanks',
      method: 'PUT',
      data: {
        playerOne: playerOneData,
        playerTwo: playerTwoData,
      }
    });

  }

  module.Player = Player
}
)(app)
