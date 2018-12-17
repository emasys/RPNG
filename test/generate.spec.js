/* eslint-disable no-undef */
import '@babel/polyfill';
import request from 'supertest';
import app from '../src/index';

describe('test suite for phone numbers generator', () => {
  describe('GET /generate', () => {
    it('should respond with a success message for authenticated user', (done) => {
      request(app.listener)
        .get('/generate')
        .expect(201, done);
    });
  });
});
