var mongoClient = require('mongodb').MongoClient;
var db_connection_string = process.env.DB

function ThreadHandler() {
  
  this.getThreads = function(req, res) {
    var board = req.params.board;
    mongoClient.connect(db_connection_string, {useUnifiedTopology: true}, (err, client)=>{
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection(board);
      var arr = collection.find({},{projection: {reported:0, delete_password:0}}).sort({bumped_on: -1}).toArray();
      Promise.resolve(arr).then(result => {
        for(let i=0; i<10; i++) {
          result[i].replies.splice(3);
        }
        res.json(result.slice(0,10));
      })
    });
  };
  
  this.addThread = function (req, res) {
    var board = req.params.board;
    var save = {
      created_on: new Date(),
      bumped_on: new Date(),
      text: req.body.text,
      reported: false,
      delete_password: req.body.delete_password,
      replies: []
    };
    mongoClient.connect(db_connection_string, {useUnifiedTopology: true}, (err, client)=> {
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection(board);
      collection.insertOne(save, (err, ret) => {
        if(err) console.log(err);
        res.redirect('/b/'+board);
      })
    })
  };
  
  this.deleteThread = function (req, res) {
    var board = req.params.board;
    var thread_id = req.body.thread_id;
    var delete_password = req.body.delete_password;
    var valid = false;
    mongoClient.connect(db_connection_string, {useUnifiedTopology: true}, (err, client)=>{
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection(board);
      collection.findOne({_id: thread_id}, (err, ret) => {
        if(err) console.log(err);
        if(delete_password == ret.delete_password) {
          collection.deleteOne({_id: thread_id}, (err, resume)=>{
            if(err) console.log(err);
            res.send('Delete successful');
          })    
        }
        else res.send('Incorrect password');
      })

    });
  };
  
  this.updateThread = function (req, res) {
    var board = req.params.board;
    var thread_id = req.body.thread_id;
    mongoClient.connect(db_connection_string, {useUnifiedTopology: true}, (err, client)=>{
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection(board);
      collection.findOneAndUpdate({_id: thread_id}, {$set: {reported: true}}, {returnNewDocument: true}, (err, ret) => {
        if(err) console.log(err);
        console.log(ret);
      })
    });
  }
}

module.exports = ThreadHandler;