'use strict';

var app = app || {};

(function(module){
  var friendlyMatchUpdate = (callback) => {
    $('.dash').off('click').on('click', '.dash_b div', (event) => {
      $.get('/vote', {userId: app.Player.localUser, winner: event.target.getAttribute('player-id')})
      .then(rows => {
        if(rows.map(ele => ele.result).includes(null)){
          $('#dash_friendly').hide();
          $('#dash_waiting').show();
        }
        else if (rows[0].result === rows[1].result){
          $.ajax({
            method:'PUT',
            url: '/updateMatch',
            data: {
              winner: rows[0].result,
              match_id: rows[0].match_id,
              playerOne:rows[0].player_id,
              playerTwo:rows[1].player_id,
            }
          })
          .then(() => {
            $('#dash_results').hide();
            $('#dash_waiting').hide();
            let me = app.Player.all.find((player)=> player.user_id === app.Player.localUser )
            let themId = rows.find(ele => ele.player_id !== app.Player.localUser).player_id;
            let us = [me, themId];
            let winner = app.Player.all.find((player)=> player.user_id === rows[0].result);
            let loser = us.find((player)=> player.user_id !== winner);
            $.ajax({
              method: 'PUT',
              url: '/updateWinsLosses',
              data: {
                winner: winner,
                loser: loser.user_id,
              }
            })
            .then(app.playerView.populatePlayers);
          })
        }
      })
      .then(callback)
    })
  }
  module.friendlyMatchUpdate = friendlyMatchUpdate;
})(app)
