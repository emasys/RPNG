import jwt from 'hapi-auth-jwt2';

// eslint-disable-next-line import/prefer-default-export
export const plugins = [
  {
    plugin: jwt,
  },
];
