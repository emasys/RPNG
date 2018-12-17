import Hapi from 'hapi';
import dotenv from 'dotenv';
import routes from './routes';
import { plugins } from './plugins';

// init env
dotenv.config();

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: process.env.PORT,
});

// validate jwt
const validate = async (decoded) => {
  if (decoded) return { isValid: true };
  return false;
};

// Start the server
const start = async () => {
  await server.register(plugins);
  server.auth.strategy('token', 'jwt', {
    key: process.env.SECRET,
    validate,
    verifyOptions: { algorithms: ['HS256'] },
  });

  // Add routes
  routes(server);

  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Server running at:', server.info.uri);
};

start();

export default server;
