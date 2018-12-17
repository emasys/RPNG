import { createUser, fetchUser } from '../services/users';

export const register = server => server.route({
  method: 'POST',
  path: '/register',
  handler(request, h) {
    return createUser(request, h);
  },
});

export const login = server => server.route({
  method: 'POST',
  path: '/login',
  handler(request, h) {
    return fetchUser(request, h);
  },
});
