'use strict';

var app = app || {};

(function(module){
  var challengePong = () => {
    $('.leaderboard').click(function(){
      $.get('/challenge').then(console.log());
    })
  }
  module.challengePong = challengePong;
})(app)
