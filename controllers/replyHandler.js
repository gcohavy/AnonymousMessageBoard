
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var db_connection_string = process.env.DB;

function ReplyHandler () {
  this.addReply = function(req, res) {
    var board = req.params.board;
    var id = req.body.thread_id;
    var save = {
      _id: new ObjectId(),
      text: req.body.text,
      delete_password: req.body.delete_password,
      created_on: new Date(),
      reported: false
    };
    mongoClient.connect(db_connection_string, {useUnifiedTopology: true}, (err, client)=> {
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection(board);
      collection.findOneAndUpdate({_id: id},{$addToSet: {replies: save}, $set: {bumped_on: new Date()}}, {returnNewDocument: true},(err, ret) =>{
        if(err) console.log(err);
        res.redirect('/b/'+ board + '/' + id);
      })
    })
    
  }
}

module.exports = ReplyHandler;