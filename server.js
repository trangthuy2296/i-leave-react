const express = require('express');
const path = require('path');
const app = express();
const proxy = require('./bin/proxy');

app.use(proxy);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(6666);