'use strict';

var app = app || {};
(function(module) {
  const Challenger = {};

  Challenger.all = [];

  Challenger.challengeOptions = function(callback){
    $.get('/findChallengers', {challenger: app.Player.localUser})
      .then(response => Challenger.all = response)
      .then(callback);

  }
  module.Challenger = Challenger;
}
)(app)
