'use strict';

var app = app || {};

(function(module){
  var challengePong = (callback) => {
    $('.leaderboard').on('click', function(){
      console.log(app.Player.localUser);
      $.get('/challenge', {challenger: app.Player.localUser/*, defender:*/}).then(callback);
    })
  }
  module.challengePong = challengePong;
})(app)
