/* eslint-disable no-undef */
import '@babel/polyfill';
import { expect } from 'chai';
import fs from 'fs';
import app from '../src/index';

describe('test suite for phone numbers generator', () => {
  after(() => {
    app.server.stop();
    fs.unlinkSync('test-PhoneNumbers.txt');
  });
  describe('POST /generate', () => {
    it('should create a file and generate a new phone number', async () => {
      const { result, statusCode } = await app.server.inject({
        method: 'POST',
        url: '/v1/generate',
      });
      expect(statusCode).to.equal(201);
      expect(result['recently added']).to.be.lengthOf(10);
    });
  });
  describe('GET /numbers', () => {
    it('should fetch all phone numbers', async () => {
      const { result, statusCode } = await app.server.inject({
        method: 'GET',
        url: '/v1/numbers',
      });
      expect(statusCode).to.equal(200);
      expect(result).to.include({
        message: 'List of numbers currently in our file',
      });
      expect(result.numbers).to.be.lengthOf(1);
    });
    it('should fetch sorted numbers', async () => {
      const { result, statusCode } = await app.server.inject({
        method: 'GET',
        url: '/v1/numbers?sort=ASC',
      });
      expect(statusCode).to.equal(200);
      expect(result).to.include({
        message: 'List of numbers currently in our file',
      });
      expect(result.meta).to.include({ sort: 'ASC' });
      expect(result.numbers).to.be.lengthOf(1);
    });
    it('should fail to sort list if wrong query is entered', async () => {
      const { result, statusCode } = await app.server.inject({
        method: 'GET',
        url: '/v1/numbers?sort=DSC',
      });
      expect(statusCode).to.equal(400);
      console.log(result);
      expect(result).to.include({
        message:
          'child "sort" fails because [You can only sort by Desc or Asc]',
      });
    });
  });
  describe('404 route', () => {
    it('should try to access an invalid route', async () => {
      const { result, statusCode } = await app.server.inject({
        method: 'GET',
        url: '/v2/invalid',
      });
      expect(statusCode).to.equal(404);
      expect(result).to.eql({
        message: 'Welcome to Random Phone Number Generator Application',
        nextStep: 'Check our docs at /documentation to get started.',
      });
    });
  });
});
