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

createPlayerTable();
createMatchTable();
createPlayerMatchTable();

// APP.get('/leaders', (request, response) =>{
//   CLIENT.query(`SELECT * FROM player ORDER BY rank ASC`)
//   .then(result =>response.send(result.rows))
// });

APP.get('/slack/auth', (request, response) => {
  console.log(request.query.code);
  let code = request.query.code;
  REQUEST(`https://slack.com/api/oauth.access?client_id=${process.env.Client_ID}&client_secret=${process.env.Client_Secret}&code=${code}`, function(err, res, body){
    console.log(body);
    body = JSON.parse(body);
    if(body.ok === true && body.team.id === 'T7C81H4N9'){
      CLIENT.query(
        'INSERT INTO player(name, class, player_id, wins, losses, games_played, rank, challenged) VALUES($1, $2, $3) ON CONFLICT (player_id) DO NOTHING;',
        [body.user.name, body.team.id, body.user.id, 0, 0, 0, 11, 0, null, null]
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

APP.get('/challenge', (req, res) => {
  console.log(req);
  slack.send({
    text: `<@${req.query.challenger}> has challenged <@${req.query.defender}>, step up or be branded a coward!`,
    username: 'The Ref'
  })
    .then(() => res.send({success: true}))
    .then(
      CLIENT.query(`
      UPDATE player
      SET challenged = 1
      WHERE player.player_id IN ($1, $2);`,
        [req.query.challenger, req.query.defender])
    )
    .then(
      CLIENT.query(`
        UPDATE player
        SET opp_id = $1
        WHERE player_id = $2;`,
        [req.query.challenger, req.query.defender]
      )
    )
    .then(
      CLIENT.query(`
        UPDATE player
        SET opp_id = $1
        WHERE player_id = $2;`,
        [req.query.defender, req.query.challenger]
      )
    )
    .then(
      CLIENT.query(`
        INSERT INTO match (winner, player1, player2)
        VALUES
        (null, $1, $2);`,
        [req.query.challenger, req.query.defender]
      )
    )
    .then(
      CLIENT.query(`
        INSERT INTO player_match (player_id, match_id, result)
        VALUES ($1, (SELECT id
                     FROM match
                     WHERE player1 = $2
                       AND player2 = $3
                         AND winner IS null) , null);`,
        [req.query.challenger, req.query.challenger, req.query.defender]
      )
    )
    .then(
      CLIENT.query(`
        INSERT INTO player_match (player_id, match_id, result)
        VALUES ($1, (SELECT id
                     FROM match
                     WHERE player1 = $2
                       AND player2 = $3
                         AND winner IS null), null);`,
        [req.query.defender, req.query.challenger, req.query.defender]
      )
    )
    .catch((err) => res.send({success: false, error: err}))
})

APP.get('/vote', (request, response) => {
  let match_id = CLIENT.query(`SELECT match_id
                               FROM player_match
                               WHERE player_id = $1
                                 AND result IS null;`,
    [request.query.userId]
  )
  let player_match_id = CLIENT.query(`SELECT id
                                      FROM player_match
                                      WHERE player_id = $1
                                        AND result IS null;`,
    [request.query.userId])
  CLIENT.query(`
    UPDATE player_match
    SET result = $1
    WHERE id = $2;`,
    [request.query.winner, player_match_id]
  ).then(
    CLIENT.query(`
      SELECT *
      FROM player_match
      WHERE match_id = $1;`,
      [match_id]
    )
  )
    .then(function(data){
      response.send(data.rows);
    })
})


/* POPULATE CHALLENGER INFORMATION --> MORE TO FOLLOW*/
APP.get('/findChallengers', (request, response) => {

  CLIENT.query(
    `SELECT player_id, rank
    FROM player
    WHERE rank < (SELECT rank
                  FROM player
                  WHERE player_id = $1)
    ORDER BY rank DESC LIMIT 2`, [request.query.challenger]
  )
  .then(function(data){
    response.send(data.rows);
  })
});

APP.put('/changeRanks', (request, response) => {
  CLIENT.query(`UPDATE player SET rank=$1 WHERE name = $2;`,
    [playerOne.rank,playerOne.name],
    function(err, info){
      console.log('invalid rank change');
    }
  );
  CLIENT.query(`UPDATE player SET rank=$1 WHERE name = $2;`,
    [playerTwo.rank, playerTwo.name],
    function(err, info){
      console.log("invalid rank change");
    }
  );
});

APP.get('/api/player', (request, response) => {
  CLIENT.query(
    `SELECT *
     FROM player
     WHERE player_id = $1;`, [request.query.userId])
    .then(function(data) {response.send(data.rows)});
})

APP.get('*', (request, response) => response.sendFile('index.html', {root: './public'}));

APP.listen(PORT, () => console.log(`port ${PORT}`));

function createPlayerTable() {
  CLIENT.query(`
    CREATE TABLE IF NOT EXISTS
    player (
      id SERIAL PRIMARY KEY,
      name VARCHAR(250) NOT NULL,
      class VARCHAR(250) NOT NULL,
      player_id VARCHAR(250) NOT NULL UNIQUE,
      rank INT,
      wins INT,
      losses INT,
      games_played INT,
      challenged INT,
      opp_id VARCHAR(250)
    );`
  )
    .catch(console.error);
}

function createMatchTable(){
  CLIENT.query(`
    CREATE TABLE IF NOT EXISTS
    match (
      id SERIAL PRIMARY KEY,
      winner INT,
      player1 VARCHAR(250) REFERENCES player(player_id),
      player2 VARCHAR(250) REFERENCES player(player_id)
    );`
  );
}

function createPlayerMatchTable() {
  CLIENT.query(`CREATE TABLE IF NOT EXISTS
      player_match(
      player_id VARCHAR(250) REFERENCES player(player_id),
      match_id INT REFERENCES match(id),
      result VARCHAR(50)
    );`
  )
}
