'use strict';

var app = app || {};

(function(module){
  const dashHandler = {};

  dashHandler.loadDash = function(){
    $('#dash_name').text('test');
    $('#dash_wins').text('1');
    $('#dash_loss').text('100');
    $('#dash_ranking').text('Ranked');
    $('#dash_you_button').text('Pat');
    $('#dash_them_button').text('Paul');
  }
  module.dashHandler = dashHandler;
})(app)
