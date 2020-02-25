/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ThreadHandler = require('../controllers/threadHandler.js');
var ReplyHandler = require('../controllers/replyHandler.js');


module.exports = function (app) {
  
  var threadHandler = new ThreadHandler();
  var replyHandler = new ReplyHandler();
  
  app.route('/api/threads/:board')
    .post(threadHandler.addThread);
    
  app.route('/api/replies/:board')
    .post(replyHandler.addReply);

};
