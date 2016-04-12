'use strict';

import express from 'express';
import consign from 'consign';

const server = express();

consign()
  .then('./src/server/modules/middleware.js')
  .then('./src/server/modules/render.js')
  .then('./src/server/routes')
  .then('./src/server/modules/boot.js')
  .into(server);

module.exports = server;
