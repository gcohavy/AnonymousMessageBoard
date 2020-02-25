/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';
var mongodb = require('mongodb');
var expect = require('chai').expect;

module.exports = function (app) {
  
  app.route('/api/threads/:board')
    .post((req, res) => {
      var board = req.query.board;
      var save = {
        created_on: new Date(),
        bumped_on: new Date(),
        text: req.body.text,
        reported: false,
        delete_password: req.body.delete_password || null,
        replies: []
      } 
      
      console.log(save);
    })
    
  app.route('/api/replies/:board');

};
