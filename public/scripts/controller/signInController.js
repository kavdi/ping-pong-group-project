'use strict'
var app = app || {};

(function(module){
  const signInController = {};
  signInController.index = () => {
    $('#slackButton').show();
    $('#hoseRules').show().siblings().hide();
    $('#about-page').hide();
    $('.dash').hide();
    $('.navItems').hide();
  };
  module.signInController = signInController;
})(app);
