import { generateNumber, fetchNumbers } from './phoneNumber';

const notFound = {
  path: '/{any*}',
  method: '*',
  handler(request, h) {
    return h
      .response({
        message: 'Welcome to Random Phone Number Generator Application',
        nextStep: 'Check our docs at /documentation to get started.',
      })
      .code(404);
  },
};

const controllerPlugin = {
  name: 'controller',
  register: (server) => {
    server.bind({ path: `${process.env.NODE_ENV}-PhoneNumbers.txt` });
    server.route(notFound);
    // eslint-disable-next-line no-param-reassign
    server.realm.modifiers.route.prefix = '/v1';
    server.route(generateNumber);
    server.route(fetchNumbers);
  },
};

export default controllerPlugin;
