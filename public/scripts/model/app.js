'use strict';

var app = app || {};

(function(module){
  var swapRank = (callback) => {
    $('.dash').off('click').on('click', '.dash_a', () => {
      $.get('/vote', {userId: app.Player.localUser, winner: $(this).attr('palyer-id')})
      .then()
    }
  module.swapRank = Rank;
})
