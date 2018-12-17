import { Op } from 'sequelize';
import { Users } from '../../sequelize/models';
import { saveUser, signToken } from '../utils';

export const createUser = async (request, h) => {
  const { email, username } = request.payload;
  const result = await Users.findAll({
    where: {
      [Op.or]: [{ email }, { username }],
    },
  });
  if (result.length) {
    return h.response({ error: 'user with this credentials already exist' }).code(409);
  }
  return saveUser(request.payload, h);
};

export const fetchUser = async (request, h) => {
  const { user, password } = request.payload;
  const result = await Users.findOne({
    where: {
      [Op.or]: [{ email: user }, { username: user }],
    },
  });
  if (!result) {
    return h.response({ error: 'No user with this credential' }).code(404);
  }
  const isValid = await result.validatePassword(password);
  if (!isValid) {
    return h.response({ error: 'invalid credentials' }).code(400);
  }
  const token = signToken(user, result.id);
  return h.response({ message: 'login successful', token }).code(200);
};
