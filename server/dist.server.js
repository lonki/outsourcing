var ip = require('ip');
var Express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

var build = require('./../build.settings');


var hostIP = ip.address() || 'localhost';
var port = '8080';
var app = new Express();

app.use(serveStatic(path.join(__dirname, '../dist'), {
  index: ['index.html'],
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧 dist testing server listening on %s:%s', hostIP, port);
  }
});
