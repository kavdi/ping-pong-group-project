'use strict'

var app = app || {};

// change code for player page

(function(module){
  const playerView = {};

  //WILL POPULATE LEADERBOARD RANKINGS
  playerView.populateRankings = function(){
    //MORE TO FOLLOW
    app.LeaderBoard.all.forEach(leaderBoard =>{
      $('#leader-board-table table').append(leaderBoard.toHtml());
    });
  };

app.LeaderBoard.fetchAll(homeView.populateRankings);
})(app);
