'use strict';
var app = app || {};

(function(module) {

  function LeaderBoard(slackDataObj){
    Object.keys(slackDataObj).forEach(key => this[key] = slackDataObj[key]);
  }

  LeaderBoard.all = [];

  LeaderBoard.prototype.toHtml = function(){
    /*MORE TO FOLLOW*/
  };

})(app);
