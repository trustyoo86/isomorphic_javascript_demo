'use strict';

import bodyParser   from 'body-parser';
import express      from 'express';
import path         from 'path';
import compression  from 'compression';

module.exports = (server) => {
  server.use(compression());
  server.use(express.static(path.join(__dirname, '..', '..', '..', 'dist')));
  server.use(bodyParser.urlencoded({extended : true}));
  server.use(bodyParser.json());
  server.set('views', path.join(__dirname, '..', 'views'));
  server.set('view engine', 'ejs');
};