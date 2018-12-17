import { generateRandomNumbers } from '../services/phonenumbers';

const config = {
  auth: {
    strategy: 'token',
  },
};
// eslint-disable-next-line import/prefer-default-export
export const generateNumber = server => server.route({
  method: 'GET',
  path: '/generate',
  config,
  handler(request, h) {
    return generateRandomNumbers(request, h);
  },
});
