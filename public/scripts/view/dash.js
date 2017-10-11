'use strict';

var app = app || {};

(function(module){
  const dashHandler = {};

  dashHandler.loadPlayer = function(req, res) {
    $.get(`/api/player`, {userId: app.Player.localUser})
      .then(
        function(res){
          debugger;
          $('#dash_name').text(res[0].name);
          $('#dash_wins').text(res[0].wins);
          $('#dash_loss').text(res[0].losses);
          $('#dash_ranking').text(res[0].rank === 11 ? 'Unranked' :'Rank: ' + res[0].rank);
          $('#dash_you_button').attr('player-id', res[0].player_id);
          console.log(res[0].player_id);
          $('#dash_them_button').attr('player-id', res[0].opp_id);
          console.log(res[0].opp_id);
          debugger;
          if(res[0].challenged === 1){
            $('.buttonStyle').hide();
          //  $('#dash_results').show();
          $('#dash_friendly').show();
          }
        }
      )
  };

  module.dashHandler = dashHandler;
})(app)
