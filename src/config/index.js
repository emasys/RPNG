import Inert from 'inert';
import Vision from 'vision';
import Swagger from 'hapi-swagger';
import dotenv from 'dotenv';
import controller from '../controller';

dotenv.config();

const config = {
  server: {
    debug: { request: ['error'] },
    port: process.env.PORT,
    router: { stripTrailingSlash: true },
    routes: {
      timeout: { server: 15000 },
      cors: { credentials: true },
      validate: {
        options: {
          stripUnknown: true,
        },
        failAction: async (request, h, err) => {
          throw err;
        },
      },
    },
  },
  register: {
    plugins: [
      { plugin: Inert.plugin },
      { plugin: Vision.plugin },
      {
        plugin: Swagger.plugin,
        options: {
          info: {
            title: 'Random Phone Number Generator',
            version: process.env.VERSION,
          },
        },
      },
      { plugin: controller },
    ],
  },
};

export default config;
