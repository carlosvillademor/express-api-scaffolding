'use strict';

var expect = require('chai').expect;
var api = require('../../src/api/api.js');

describe('API', function () {
  it('should have merge end point', function () {
    expect(api.merge).to.be.a('function', 'API does not have merge end point');
  });
});
