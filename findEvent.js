var ObjectID = require('mongodb').ObjectID;

module.exports = function(db) {
  var eventsCollection = db.collection('events');

  function handleRequest(req, resp) {
    try {
      var query = {
        _id: ObjectID( req.params.id )
      };

      eventsCollection.findOne( query, outputDocument );
    } catch (e) {
      resp.status(400).end();
    }

    function outputDocument(err, item) {
      if (err) {
        console.log(err);
        resp.status(500).end();
        return;
      }

      if (item) {
        resp.json( item );
      } else {
        resp.status(404).end();
      }
    }
  }

  return handleRequest;
};
