import { generateRandomNumbers } from '../services/phonenumbers';
// eslint-disable-next-line import/prefer-default-export
export const generateNumber = server => server.route({
  method: 'GET',
  path: '/generate',
  handler(request, h) {
    return generateRandomNumbers(request, h);
  },
});
