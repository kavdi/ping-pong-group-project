'use strict';

const PG = require('pg');
const FS = require('fs');
const EX = require('express');
const PARSER = require('body-parser');
const PORT = process.env.PORT || 3000;
const APP = EX();
const SLACK = require('node-slack');
// const REQUEST_PROXY = require('express-request-proxy');
const REQUEST = require('request');
const conString = process.env.DATABASE_URL;
const CLIENT = new PG.Client(conString);
const hook_url = 'https://hooks.slack.com/services/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';
const slack = new SLACK(hook_url);

CLIENT.connect();
CLIENT.on('error', err => console.error(err));

APP.use(PARSER.json());
APP.use(PARSER.urlencoded({extended: true}));
APP.use(EX.static('./public'));

createTable();

APP.get('/leaders', (request, response) =>{
  CLIENT.query(`SELECT * FROM player ORDER BY player_rank ASC`)
  .then(result =>response.send(result.rows))
});

APP.get('/slack/auth', (request, response) => {
  console.log(request.query.code);
  let code = request.query.code;
  REQUEST(`https://slack.com/api/oauth.access?client_id=${process.env.Client_ID}&client_secret=${process.env.Client_Secret}&code=${code}`, function(err, res, body){
    console.log(body);
    body = JSON.parse(body);
    if(body.ok === true && body.team.id === 'T7C81H4N9'){
      CLIENT.query(
        'INSERT INTO player(name, class, player_id) VALUES($1, $2, $3) ON CONFLICT (player_id) DO NOTHING;',
        [body.user.name, body.team.id, body.user.id]
      ).then(() => response.redirect(`/user/${body.user.id}`));

    }
    else {
      console.log('NO ENTRY');
      response.redirect('/') //TODO: wrong slack channel message needed.
    }
  })
})

APP.get('/api/players', function(req, res){
  CLIENT.query(
    `SELECT * FROM player;`).then(
    function(data){
      // console.log(data.rows)
      res.send(JSON.stringify(data.rows))
    }
  )
})

APP.get('/challenge', function(req, res){
  console.log(req);
  slack.send({
    text: `<@${req.query.challenger}> has challenged <@${req.query.defender}, step up or be branded a coward!`,
    username: 'The Ref'
  })
  .then(() => res.send({success: true}))
  .catch((err) => res.send({success: false, error: err}))
})


APP.get('*', (request, response) => response.sendFile('index.html', {root: './public'}));

/* POPULATE CHALLENGER INFORMATION --> MORE TO FOLLOW*/
APP.get('/currentPlayer', (request, response) => {
//NOTE - look into passing objects to this block
//  function(playerData){
    var name = playerData['name'];
    CLIENT.query(
      `SELECT player_rank FROM player WHERE name=$1;`,
      [name],
      function(err,info){
        console.log("error - player not found");
      }
    )
//}
});

APP.get('/findChallengers', (request, response) => {
    var upperLimit = parseInt(playerObj['rank']) + 2;

    CLIENT.query(`SELECT name FROM player WHERE player_rank < $1;`,
      [upperLimit],
      function(err, info){
        console.log("no valid challenges");
      }
    )

});

APP.get('/changeRanks', (request, response) =>{
  let playerOne, playerTwo, whoWon = {};

  var swap = 0;

  if(playerOne.name == whoWon && playerOne.rank > playerTwo.rank){
    console.log("swap here");
    swap = playerTwo.rank;
    playerTwo.rank = playerOne.rank;
    playerOne.rank = swap;
  }else if(playerTwo.name == whoWon && playerTwo.rank > playerOne.rank){
    console.log("swap here");
    swap = playerOne.rank;
    playerOne.rank = playerTwo.rank;
    playerTwo.rank = swap;
  }

  CLIENT.query(`UPDATE player SET rank=$1 WHERE name = $2;`,
    [playerOne.rank,playerOne.name],
    function(err, info){
      console.log("invalid rank change");
    }
  );

  CLIENT.query(`UPDATE player SET rank=$1 WHERE name = $2;`,
    [playerTwo.rank, playerTwo.name],
    function(err, info){
        console.log("invalid rank change");
    }
  );

});

APP.listen(PORT, () => console.log(`port ${PORT}`));

function createTable() {
  CLIENT.query(`
    CREATE TABLE IF NOT EXISTS
    player (
      id SERIAL PRIMARY KEY,
      name VARCHAR(250) NOT NULL,
      class VARCHAR(250) NOT NULL,
      player_id VARCHAR(250) NOT NULL UNIQUE,
      player_rank VARCHAR(250),
      wins INT,
      losses INT,
      games_played INT,
      rival VARCHAR(250)
    );`
  )
    .catch(console.error);
}
