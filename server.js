'use strict';

const PG = require('pg');
const FS = require('fs');
const EXPRESS = require('express');
const PARSER = require('body-parser');
const PORT = process.env.PORT || 3000;
const APP = express();
const REQUEST_PROXY = require('express-request-proxy');
const conString = '';
const CLIENT = new PG.Client(conString);
