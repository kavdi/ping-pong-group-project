'use strict';

var app = app || {};

(function(module){
  var swapRank = (callback) => {
    $('.dash').off('click').on('click', '.dash_a', (playerOne, playerTwo) => {

    }
  }

  module.swapRank = Rank;
})



// assume winner is known
// Player.swapRank = function(playerOne,playerTwo){
//   let swap = 0;
//
//   swap = playerTwo.rank;
//   playerTwo.rank = playerOne.rank;
//   playerOne.rank = swap;
//
//   //put request
//   $.ajax({
//     url: '/changeRanks',
//     method: 'PUT',
//     data: {
//       playerOne: playerOne,
//       playerTwo: playerTwo,
//     }
//   });
//
// }
