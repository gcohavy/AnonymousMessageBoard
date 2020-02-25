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


module.exports = function (app) {
  
  var threadHandler = new ThreadHandler();
  
  app.route('/api/threads/:board')
    .post(threadHandler.addThread);
    
  app.route('/api/replies/:board');

};
