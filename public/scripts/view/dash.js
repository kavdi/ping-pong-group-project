'use strict';

var app = app || {};

(function(module){
  const dashHandler = {};

  dashHandler.loadPlayer = function(req, res) {
    $.get(`/api/player`, {userId: app.Player.localUser})
      .then(
        function(res){
          $('#dash_name').text(res[0].name);
          $('#dash_wins').text(res[0].wins);
          $('#dash_loss').text(res[0].losses);
          $('#dash_ranking').text(res[0].rank === 11 ? 'Unranked' :'Rank: ' + res[0].rank);
          $('#dash_you_button').attr('player-id', res[0].player_id);
          $('#dash_them_button').attr('player-id', res[0].opp_id);
          $('#dash_you_button_friendly').attr('player-id', res[0].player_id);
          $('#dash_them_button_friendly').attr('player-id', res[0].opp_id);
          if(res[0].challenged === 1 && res[0].friendly_game === 0){
            app.swapRank();
            $('.buttonStyle').hide();
            $('#dash_results').show();
          }
          else if (res[0].challenged === 1 && res[0].friendly_game === 1) {
            app.friendlyMatchUpdate();
            $('.buttonStyle').hide();
            $('#dash_friendly').show();
          }
        }
      )
  };

  module.dashHandler = dashHandler;
})(app)
