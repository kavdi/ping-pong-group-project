'use strict';

var app = app || {};
(function(module) {
  const Challenger = {};
  // function Challenger(rawData){
  //   this.id = rawData.id;
  //   this.playerOne = rawData.playerOne;
  //   this.playerTwo = rawData.playerTwo;
  //   this.winner = rawData.winner;
  //   this.loser = rawData.loser;
  // }
  //
  Challenger.all = [];
  //
  // Challenger.loadChallengers = function(callback){}

  //TODO - function which shows buttons for every Challenger
  //NOTE:can I listen for two urls
  Challenger.challengeOptions = function(callback){
    $.get('/findChallengers', {challenger: app.Player.localUser})
      .then(response => Challenger.all = response)
      .then(callback);

  }
  module.Challenger = Challenger;
}
)(app)
