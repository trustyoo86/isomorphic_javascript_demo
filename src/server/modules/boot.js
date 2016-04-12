import http from 'http';

/**
 * @name boot
 * @description node.js booting middleware
 * @param {object} server express object
 */
module.exports = (server) => {
  var port = process.env.PORT || 3000;

  http.createServer(server).listen(port, () => {
    console.log('Server start..!!');
  });
};