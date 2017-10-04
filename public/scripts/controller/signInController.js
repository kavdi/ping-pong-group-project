'use strict'
var app = app || {};

(function(module){
  const signInController = {};
  signInController.index = () => {
    $('#slackButton').show();
    $('#hoseRules').show().siblings().hide();
    $('#about-page').hide();
  };
  module.signInController = signInController;
})(app);
