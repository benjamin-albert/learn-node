var ObjectID = require('mongodb').ObjectID;
module.exports = function(db) {
  var eventsCollection = db.collection('events');

  return function(req, resp) {
    var query, idParam = req.params.id;
    if (idParam) {
      try {
        query = { _id: ObjectID(idParam) };
      } catch (e) {
        resp.status(400).end();
        return;
      }
    }

    eventsCollection.find(query).toArray(function(err, items) {
      if (err) {
        resp.status(500).end();
        throw err;
      } else {
        if (!items.length) {
          resp.status(404).end();
        } else {
          resp.json( idParam ? items[0] : items );
        }
      }
    });
  };
};
