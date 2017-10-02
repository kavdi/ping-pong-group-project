'use strict'

var app = app || {};

(function(module){
  const homeView = {};

  //WILL POPULATE LEADERBOARD RANKINGS
  homeView.populateRankings = function(){
    //MORE TO FOLLOW
    app.LeaderBoard.all.forEach(leaderBoard =>{
      console.log("test");
      $('#leader-board-table table').append(leaderBoard.toHtml());
    });
  };

app.LeaderBoard.fetchAll(homeView.populateRankings);
})(app);
