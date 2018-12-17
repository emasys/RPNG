import { register, login } from './user';
import { generateNumber } from './phoneNumber';

const routes = (server) => {
  register(server);
  login(server);
  generateNumber(server);
};

export default routes;
