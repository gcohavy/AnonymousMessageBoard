
var mongoClient = require('mongodb').MongoClient;
var db_connection_string = process.env.DB;

function ReplyHandler () {
  this.addReply = function(req, res) {
    var board = req.params.board;
    var save = {
      text: req.body.text,
      delete_password: req.body.delete_password,
      thread_id: req.body.thread_id
    };
    mongoClient.connect(db_connection_string, {useUnifiedTopology: true}, (err, client)=> {
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection(board);
      collection.findOneAndUpdate({_id: req.body.thread_id})
    })
    
  }
}

module.exports = ReplyHandler;