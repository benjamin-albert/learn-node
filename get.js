module.exports = function(db) {
  var eventsCollection = db.collection('events');

  return function(req, res) {
    eventsCollection.find().toArray(function(err, items) {
      if (err) {
        res.status(500).end();
      } else {
        res.json( items );
      }
    });
  };
};
