'use strict'
var app = app || {};

(function(module){
  const homeController = {};
  homeController.index = (ctx) => {
    $('#slackButton').hide();
    $('#player-table').hide();
    $('.navItems a:first').attr('href', `/user/${ctx.params.id}`)
    app.Player.localUser = ctx.params.id;
    app.challengePong();
    app.friendlyPong();
    app.friendlyMatchUpdate();
    app.swapRank();
    if (app.Player.all.length === 0)app.Player.loadPlayers(app.leaderboardView.populatePlayers);
    else app.leaderboardView.populatePlayers();
    app.dashHandler.loadPlayer()
    $('#leader-board-table').fadeIn(1000);
    $('#about-page').hide();
    $('.playerContainer').hide();
    $('.subTitle').html(`The "official" ping-pong leaderboard. Challenge your friends with <i class="fa fa-slack fa-2" aria-hidden="true"></i> Slack!`);
  };

  module.homeController = homeController;

})(app);
