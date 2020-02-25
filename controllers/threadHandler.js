var mongoClient = require('mongodb').MongoClient;
var db = process.env.DB

function ThreadHandler() {
  this.addThread = function (req, res) {
      var board = req.query.board;
      var save = {
        created_on: new Date(),
        bumped_on: new Date(),
        text: req.body.text,
        reported: false,
        delete_password: req.body.delete_password,
        replies: []
      }
      mongoClient.connect(db, )
    
  }
}