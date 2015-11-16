'use strict';

var request = require('supertest');

request = request('http://localhost:3000');

describe('API', function () {
  it('should return HTTP status code 200 for GET requests to root path', function (done) {
    request
      .get('/')
      .expect(200, done);
  });
});
