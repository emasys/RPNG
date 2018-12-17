import Hapi from 'hapi';
import dotenv from 'dotenv';
import routes from './routes';

// init env
dotenv.config();

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: process.env.PORT,
});

// Add routes
routes(server);

// Start the server
const start = async () => {
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
