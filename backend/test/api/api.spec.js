'use strict';

var request = require('supertest');
require = require('really-need');

var server;

beforeEach(function () {
  server = require('../../src/server/server', { bustCache: true });
});

afterEach(function (done) {
  server.close(done);
});

describe('API', function () {
  it('should return HTTP status code 200 for GET requests to root path', function (done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
});
