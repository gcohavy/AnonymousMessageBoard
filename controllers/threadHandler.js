var mongoClient = require('mongodb').MongoClient;
var db_connection_string = process.env.DB

function ThreadHandler() {
  
  this.getThreads = function(req, res) {
    var board = req.params.board;
    mongoClient.connect(db_connection_string, {useUnifiedTopology: true}, (err, client)=>{
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection(board);
      var arr = collection.find({projection: {}}).sort({bumped_on: -1}).toArray();
      Promise.resolve(arr).then(result => {console.log(result.slice(0,10))})
      console.log(new Date())
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
    mongoClient.connect(db_connection_string, {useUnifiedTopology: true}, (err, client)=>{
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection(board);
      
    });
  };
  
  this.updateThread = function (req, res) {
    var board = req.params.board;
    mongoClient.connect(db_connection_string, {useUnifiedTopology: true}, (err, client)=>{
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection(board);
      
    });
  }
}

module.exports = ThreadHandler;