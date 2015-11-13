'use strict';

var express = require('express');
var api = express.Router();

api.post('/merge', function (req, res) {
  res.sendStatus(200);
});

module.exports = api;
