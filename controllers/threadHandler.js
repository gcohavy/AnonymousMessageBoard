var mongoClient = require('mongodb').MongoClient;
var db = process.env.DB

function ThreadHandler() {
  this.addThread = function (req, res) {
      var board = req.params.board;
      var save = {
        created_on: new Date(),
        bumped_on: new Date(),
        text: req.body.text,
        reported: false,
        delete_password: req.body.delete_password,
        replies: []
      }
      mongoClient.connect(db, {useUnifiedTopology: true}, (err, client)=> {
        if(err) console.log(err);
        var db = client.db('test');
        var collection = db.collection(board);
        collection.insertOne(save, (err, ret) => {
          if(err) console.log(err);
          res.redirect('/b/'+board);
        })
      })
  }
}

module.exports = ThreadHandler;