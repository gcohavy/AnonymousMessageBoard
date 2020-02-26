
var mongoClient = require('mongodb').MongoClient;
var db_connection_string = process.env.DB;

function ReplyHandler () {
  this.addReply = function(req, res) {
    var board = req.params.board;
    var id = req.body.thread_id;
    var bumped_on = new Date();
    var save = {
      text: req.body.text,
      delete_password: req.body.delete_password,
      created_on: new Date(),
      reported: false
    };
    mongoClient.connect(db_connection_string, {useUnifiedTopology: true}, (err, client)=> {
      if(err) console.log(err);
      var db = client.db('test');
      var collection = db.collection(board);
      collection.findOneAndUpdate({_id: id},{bumped_on: bumped_on, $addToSet: {replies: save}}, {returnNewDocument: true},(err, ret) =>{
        if(err) console.log(err);
        console.log(ret);
        res.redirect('/b/'+ board + '/' + id);
      })
    })
    
  }
}

module.exports = ReplyHandler;