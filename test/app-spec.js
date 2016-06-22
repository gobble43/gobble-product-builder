require('./setup');
const expect = require('chai').expect;
const path = require('path');

// We're using supertest, which allows for use of any super-agent methods
// and really easy HTTP assertions.
// See https://www.npmjs.com/package/supertest for a better reference
const appUrl = `${process.env.PROTOCOL}${process.env.HOST}:${process.env.PORT}`;
console.log(appUrl);
const request = require('supertest');

describe('Gobble Product Builder', () => {
  describe('Basic GET Request', () => {
    it('should return status code 200 and "Hello, World!"', (done) => {
      request(appUrl)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200, 'Hello World!')
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
  describe('Process UPC', () => {
    it('should return status code 201 for valic upc', (done) => {
      const upc = { upc: '0022000011879' };
      request(appUrl)
        .post('/api/product')
        .type('form')
        .set('Accept', 'application/json')
        .send(upc)
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
    it('should return status code 400 for invalid upc', (done) => {
      const upc = { upc: undefined };
      request(appUrl)
        .post('/api/product')
        .type('form')
        .set('Accept', 'application/json')
        .send(upc)
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          return done();
        });
    });
  });
  // More tests (as in A LOT more!) and describe blocks below
});
