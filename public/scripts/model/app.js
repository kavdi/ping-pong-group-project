// NOTE:Doesn't look like we need this file.
'use strict';
var app = app || {};

(function(module) {
  function LeaderBoard(slackDataObj){
    Object.keys(slackDataObj).forEach(key => this[key] = slackDataObj[key]);
  }

  LeaderBoard.all = [];

  LeaderBoard.prototype.toHtml = function(){
    let template = Handlebars.compile($('#leader-board-template').text());
    var html = template(this);

    return html;
  };

  LeaderBoard.loadAll = function(rows){
    //populate Leaderboard.all with player objects
    LeaderBoard.all = rows.map(function(players){
      return new LeaderBoard (players);
    });
  };

  LeaderBoard.fetchAll = function(callback){
    $.get('/leaders')
    .then(
      function(results){
        LeaderBoard.loadAll(results);
        callback();
      }
    );
  };

  module.LeaderBoard = LeaderBoard;
})(app);
