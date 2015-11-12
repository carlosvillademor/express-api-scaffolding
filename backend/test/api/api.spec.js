'use strict';

var assert = require('assert');
var api = require('../../src/api/api.js');

describe('API', function () {
  it('should have merge end point', function () {
    assert(api.merge, 'API does not have merge end point');
  });
});
