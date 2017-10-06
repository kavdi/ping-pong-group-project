'use strict';

var app = app || {};

(function(module){
  const dashHandler = {};
  dashHandler.loadPlayer = function(callback) {
    $.get(`/api/player`, {users_id: app.Player.localUser}, function(req, res){
    }).then(callback)
  };

  dashHandler.loadDash = function(userObj){
    $('#dash_name').text(userObj.name);
    $('#dash_wins').text(userObj.wins);
    $('#dash_loss').text(userObj.losses);
    $('#dash_ranking').text(userObj.rank === 11 ? 'Unranked' : userObj.rank);
    $('#dash_you_button').text(userObj.name);
    $('#dash_them_button').text(userObj.opponent);
    $('#local_user_dash_button').attr('player-id', userObj.player_id);
    $('#other_user_dash_button').attr('player-id', userObj.opp_id);
  }
  module.dashHandler = dashHandler;
})(app)


// This needs to go in server.js


// APP.get('/api/player', (req, res) => {
//   CLIENT.query(
//     `SELECT (name, player_id, rank, wins, losses, games_played, )`
//   )
// })
//
// `SELECT player_id
//  FROM player
//     JOIN player_match
//       ON player.id
//         = player_match.id
//     JOIN match
//       ON player_match.id
//         = match.id
//  `
//
//  `SELECT match.id
//   FROM match
//     JOIN player_match
//       ON match.id
//         = player_match.match_id
//    WHERE player.id = ${app.Player.localUser} AND match.winner = null;`
//
//
// (`CREATE TABLE IF NOT EXISTS
//   match (
//     id SERIAL PRIMARY KEY,
//     winner INT
//   );`)
//   (`CREATE TABLE IF NOT EXISTS
//     player_match(
//       player_id INT REFERENCES player(id),
//       match_id INT REFERENCES match(id)
//     );`
//   )
//
//   SELECT matches.id
//    FROM matches
//      JOIN play_match
//        ON matches.id
//          = play_match.match_id
//     WHERE play_match.players_id = 1 AND matches.winner = null;
