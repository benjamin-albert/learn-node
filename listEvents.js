module.exports = function(db) {
  var eventsCollection = db.collection('events');

  function handleRequest(req, resp) {
    eventsCollection.find().toArray(function(err, events) {
      if (err) {
        console.log(err);
        resp.status(500).end();
        return;
      }

      resp.json( events );
    });
  }

  return handleRequest;
};
