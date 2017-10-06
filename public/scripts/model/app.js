'use strict';

var app = app || {};

(function(module){
  var swapRank = (callback) => {
    $('.dash').off('click').on('click', '.dash_a div', (event) => {
      console.log(event.target.getAttribute('player-id'));
      $.get('/vote', {userId: app.Player.localUser, winner: event.target.getAttribute('player-id')})
      .then(rows => {
        if(rows.map(ele => ele.result).includes(null)){
          $('#dash_results').hide();
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
           .then(()=> {
             $('#dash_results').hide();
             $('#dash_waiting').hide();
             let me = app.Player.all.find((player)=> player.user_id === app.Player.localUser )
             let themId = rows.find(ele => ele.player_id !== app.Player.localUser).player_id;
             let them = app.Player.all.find((player)=> player.user_id === themId )
             let higherRank = me.rank < them.rank ? me:them;
             let winner = app.Player.all.find((player)=> player.user_id === rows[0].result);
             console.log(me);
             console.log(them);
             if (higherRank !== winner){
               let temp = me.rank;
               me.rank = them.rank;
               them.rank = temp;
               $.ajax({
                 method: 'PUT',
                 url: '/changeRanks',
                 data: {
                   playerOne: me,
                   playerTwo: them,
                 }
               })
               .then(app.leaderboardView.populatePlayers)
             }
           })
        }
      })
      .then(callback)
    })
  }
  module.swapRank = swapRank;
})(app);
