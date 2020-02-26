
var mongoClient = require('mongodb').MongoClient;
var db = process.env.DB;

function ReplyHandler () {
  this.addReply = function(req, res) {
    var board = req.params.board;
    var save = {
      text: req.body.text,
      delete_password: req.body.delete_password,
      thread_id: req.body.thread_id
    };
    
  }
}

module.exports = ReplyHandler;