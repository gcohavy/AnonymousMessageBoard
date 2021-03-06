/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var mongoClient = require('mongodb').MongoClient;
var ThreadHandler = require('../controllers/threadHandler.js');
var ReplyHandler = require('../controllers/replyHandler.js');

var db_connection_string = process.env.DB;


module.exports = function (app) {
  
  var threadHandler = new ThreadHandler();
  var replyHandler = new ReplyHandler();
  
  //Insert a thread for testing purposes
  mongoClient.connect(db_connection_string, {useUnifiedTopology: true}, (err, client)=> {
    if(err) console.log(err);
    var db = client.db('test');
    var collection = db.collection('testcollection');
    collection.deleteOne({_id: 'testid'}, (err, ret) => {
      if(err) console.log('err deleting test thread duplicate: ' + err);
      console.log('duplicate thread deleted');
    });
    collection.insertOne({
      _id: 'testid',
      created_on: new Date(),
      bumped_on: new Date(),
      text: 'test text',
      reported: false,
      delete_password: 'req.body.delete_password',
      replies: ['1', '2', '3', '4', '5', {
        _id: 'testid', 
        delete_password: 'password', 
        text: 'This reply is for deleting :)'
      }]}, (err, ret) => {
      if(err) console.log('err inserting test thread: ' + err);
      console.log('Test thread inserted');
    })
  })
  
  //routing
  app.route('/api/threads/:board')
    .get(threadHandler.getThreads)
    .post(threadHandler.addThread)
    .put(threadHandler.updateThread)
    .delete(threadHandler.deleteThread);
    
  app.route('/api/replies/:board')
    .get(replyHandler.getReplies)
    .post(replyHandler.addReply)
    .put(replyHandler.updateReply)
    .delete(replyHandler.deleteReply);

};
