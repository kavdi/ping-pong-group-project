'use strict'

var app = app || {};

(function(module){
  const homeView = {};

  //WILL POPULATE LEADERBOARD RANKINGS
  homeView.populateRankings = function(){
    //MORE TO FOLLOW
    app.LeaderBoard.all.forEach(leaderBoard =>{
      $('#leader-board-table table').append(leaderBoard.toHtml());
    });
  };

app.LeaderBoard.fetchAll(homeView.populateRankings);
})(app);


/*
GET RANGE OF PLAYERS
SELECT name FROM player WHERE playerrank BETWEEN '1' and '3';

var att  = result[0].curattend;
 client.query("INSERT INTO archive (attendance) VALUES (?);", [att], function(err,info){ });

*/
