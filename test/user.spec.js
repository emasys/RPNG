/* eslint-disable no-undef */
import '@babel/polyfill';
import request from 'supertest';
import { expect } from 'chai';
import app from '../src/index';
import models from '../sequelize/models';

describe('test suite for user operations', () => {
  describe('POST /register', () => {
    before((done) => {
      models.sequelize
        .sync({ force: true })
        .then(() => {
          done(null);
        })
        .catch((errors) => {
          done(errors);
        });
    });
    it('should respond with success message', (done) => {
      request(app.listener)
        .post('/register')
        .send({
          email: 'sample@example.com',
          password: 'password',
          username: 'admin',
          name: 'john doe',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          if (!err) {
            expect(res.body).to.include({ message: "john doe's account successfully created" });
          }
          done();
        });
    });
  });

  describe('POST /login', () => {
    it('should respond with success message', (done) => {
      request(app.listener)
        .post('/login')
        .send({
          user: 'sample@example.com',
          password: 'password',
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (!err) {
            expect(res.body).to.include({ message: 'login successful' });
          }
          done();
        });
    });
  });
});
