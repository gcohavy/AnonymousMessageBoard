
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var db_connection_string = process.env.DB;

function ReplyHandler () {
  
  this.getReplies = function (req, res) {
    var board = req.params.board;
    var thread_id = req.query.thread_id);
    mongoClient.connect(db_connection_string, {useUnifiedTopology: true}, (err, client)=>{
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection(board);
      collection.findOne({_id: thread_id}, {reported: 0, delete_password: 0}, (err, ret)=> {
        if(err) console.log(err);
        console.log(ret)
      })
    });
  };
  
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
  };
  
  this.updateReply = function (req, res) {
    var board = req.params.board;
    mongoClient.connect(db_connection_string, {useUnifiedTopology: true}, (err, client)=>{
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection(board);
      
    });
  };
  
  this.deleteReply = function (req, res) {
    var board = req.params.board;
    mongoClient.connect(db_connection_string, {useUnifiedTopology: true}, (err, client)=>{
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection(board);
      
    });
  };
};

module.exports = ReplyHandler;