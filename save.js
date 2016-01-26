var seed = 0;
module.exports = function(req, resp) {
  var attrs = req.body, id = req.params.id;
  console.log("Event id: " + id);
  console.log(attrs);
  console.log();
  if (attrs.lorem) {
    console.log("Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare vitae turpis ut dictum. Praesent tincidunt tellus non nunc scelerisque, vel rhoncus velit fringilla. Suspendisse ultrices nec enim porta imperdiet. Fusce nec maximus lorem, ac pretium odio. Donec blandit lacinia ligula non imperdiet. Vivamus a turpis diam. Donec id ante vel quam hendrerit luctus nec ultricies sem. Suspendisse quam magna, lacinia at ligula sed, mollis venenatis libero. Sed congue urna ut est tristique, nec rutrum nisl pulvinar. Nunc consectetur nunc massa, sit amet imperdiet risus feugiat at. Aenean eu hendrerit purus. Donec at nibh fermentum, faucibus elit et, sagittis risus. Sed egestas luctus arcu eu tristique. Morbi sed tincidunt enim, fringilla scelerisque velit.");
  }

  var response = { status: 'ok' };
  if (!id) {
    response.id = ++seed;
  }

  resp.json( response );
};
