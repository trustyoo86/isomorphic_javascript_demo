/**
 * @name question
 * @description
 *  server routing related on question
 * @param {object} server express object
 */
module.exports = (server) => {
  server.route('/question')
    .get();
}