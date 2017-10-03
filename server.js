'use strict';

const PG = require('pg');
const FS = require('fs');
const EX = require('express');
const PARSER = require('body-parser');
const PORT = process.env.PORT || 3000;
const APP = EX();
// const REQUEST_PROXY = require('express-request-proxy');
const REQUEST = require('request');
const conString = process.env.DATABASE_URL;
const CLIENT = new PG.Client(conString);

CLIENT.connect();
CLIENT.on('error', err => console.error(err));

APP.use(PARSER.json());
APP.use(PARSER.urlencoded({extended: true}));
APP.use(EX.static('./public'));

loadDB();

APP.get('/leaders', (request, response) =>{
  CLIENT.query(`SELECT * FROM player ORDER BY playerrank ASC`)
  .then(result =>response.send(result.rows))
  .catch(console.error);
});

APP.get('/slack/auth', (request, response) => {
  console.log(request.query.code);
  let code = request.query.code;
  REQUEST(`https://slack.com/api/oauth.access?client_id=${process.env.Client_ID}&client_secret=${process.env.Client_Secret}&code=${code}`, function(err, response, body){
    console.log(body);
    body = JSON.parse(body);
    if(body.ok === true){
      console.log("BODY IS OK!!!!");
    }else{
      console.log("BODY IS NOT OK!!!!");
    }
    let players = {};
    players.ok = body.ok;

    players.name = body.user.name;
    player.id = body.user.id;
    player.team = body.team.id;
    loadLeaderboard(players);
  })
})

APP.get('*', (request, response) => response.sendFile('index.html', {root: './public'}));
APP.listen(PORT, () => console.log(`port ${PORT}`));


function loadLeaderboard(players) {
  FS.readFile('./public/data/data.json', (err, data) => {
    JSON.parse(data.toString()).forEach(ele => {
      CLIENT.query(
        'INSERT INTO player(ok, name, id, team) VALUES($1, $2, $3, $4) ON CONFLICT (player.id) DO NOTHING;',
        [ele.ok, ele.name, ele.id, ele.team]
      )
        .catch(console.error);
    })
  })
}

function loadDB() {
  CLIENT.query(`
    CREATE TABLE IF NOT EXISTS
    player (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      class VARCHAR(200) NOT NULL,
      player_id VARCHAR(200) NOT NULL UNIQUE,
      player_team VARCHAR(200) NOT NULL,
      playerRank VARCHAR(200)
    );`
  )
  .then(loadLeaderboard)
  .catch(console.error);
}
