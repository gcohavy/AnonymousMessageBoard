/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;

module.exports = function (app) {
  
  app.route('/api/threads/:board')
    .post((req, res) => {
      var board = req.query.board;
      console.log(req);
    })
    
  app.route('/api/replies/:board');

};
