'use strict'

var app = app || {};

(function(module){
  const homeView = {};

  //WILL POPULATE LEADERBOARD RANKINGS
  homeView.populateRankings = function(){
    //MORE TO FOLLOW
    app.LeaderBoard.all.forEach(leaderBoard =>{
      console.log("test");
    });
  };


})(app);

//initIndexPage
/*
articleView.initIndexPage = () => {
  $('#ajax-spinner').fadeOut();
  $('#filters').fadeIn();
  app.Article.all.forEach(article => {
    $('#articles').append(article.toHtml('#article-template'));
    if($(`#category-filter option:contains("${article.category}")`).length === 0) {
      $('#category-filter').append(article.toHtml('#category-filter-template'));
    }
    if($(`#author-filter option:contains("${article.author}")`).length === 0) {
      $('#author-filter').append(article.toHtml('#author-filter-template'));
    }
  });

*/
