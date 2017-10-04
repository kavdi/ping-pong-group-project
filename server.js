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

createTable();

APP.get('/leaders', (request, response) =>{
  CLIENT.query(`SELECT * FROM player ORDER BY playerrank ASC`)
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
      ).then(() => {response.redirect('/user'); response.send(body.user.id)})

    }
    else {
      console.log('NO ENTRY');
      response.redirect('/') //TODO: wrong slack channel message needed.
    }
  })
})

APP.get('*', (request, response) => response.sendFile('index.html', {root: './public'}));
APP.listen(PORT, () => console.log(`port ${PORT}`));

function createTable() {
  CLIENT.query(`
    CREATE TABLE IF NOT EXISTS
    player (
      id SERIAL PRIMARY KEY,
      name VARCHAR(250) NOT NULL,
      class VARCHAR(250) NOT NULL,
      player_id VARCHAR(250) NOT NULL UNIQUE,
      playerRank VARCHAR(250)
    );`
  )
  .catch(console.error);
}
