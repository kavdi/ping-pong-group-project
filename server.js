'use strict';

const PG = require('pg');
const FS = require('fs');
const EX = require('express');
const PARSER = require('body-parser');
const PORT = process.env.PORT || 3000;
const APP = EX();
// const REQUEST_PROXY = require('express-request-proxy');
const conString = 'postgres://localhost:5432/ping-pong';
const CLIENT = new PG.Client(conString);

CLIENT.connect();
CLIENT.on('error', err => console.error(err));

APP.use(PARSER.json());
APP.use(PARSER.urlencoded({extended: true}));
APP.use(EX.static('./public'));

loadDB();

APP.get('*', (request, response) => response.sendFile('index.html', {root: './public'}));
APP.listen(PORT, () => console.log(`port ${PORT}`));


function loadLeaderboard() {
  FS.readFile('./public/data/data.json', (err, data) => {
    JSON.parse(data.toString()).forEach(ele => {
      CLIENT.query(
        'INSERT INTO player(name, class, playerEmail, playerRank) VALUES($1, $2, $3, $4) ON CONFLICT (playerEmail) DO NOTHING;',
        [ele.playerName, ele.class, ele.playerEmail, ele.playerRank]
      )
        .catch(console.error);
    })
  })
}



function loadDB() {
  CLIENT.query(`
    CREATE TABLE IF NOT EXISTS
    player (
      player_id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      class VARCHAR(200) NOT NULL,
      playerEmail VARCHAR(200) NOT NULL UNIQUE,
      playerRank VARCHAR(200)
    );`
  )
  .then(loadLeaderboard)
  .catch(console.error);
}
