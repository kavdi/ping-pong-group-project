'use strict';
var app = app || {};

(function(module) {

  function LeaderBoard(slackDataObj){
    Object.keys(slackDataObj).forEach(key => this[key] = slackDataObj[key]);
  }

  LeaderBoard.all = [];

  LeaderBoard.prototype.toHtml = function(){
    let template = Handlebars.compile($('#leader-board-template').text());
    var html    = template(this);

    return html;
  };

  LeaderBoard.loadAll = function(rows){
    //sort player objects
    rows.sort(function(player1,player2){
      return player2.playerRank - player1.playerRank;
    })
    //populate Leaderboard.all with player objects
    LeaderBoard.all = rows.map(function(players){
      return new LeaderBoard (players);
    });
  };

  LeaderBoard.fetchAll = function(callback){
    $.get('/data/data.json')
    .then(
      function(results){
        LeaderBoard.loadAll(results);
        callback();
      }
    );
  };

  module.LeaderBoard = LeaderBoard;
})(app);


/*

Article.loadAll = rows => {
  rows.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)));
  Article.all = rows.map(ele => new Article(ele));
};


Article.fetchAll = callback => {
    $.get('/articles')
    .then(
      results => {
        Article.loadAll(results);
        callback();
      }
    )
  };

*/
