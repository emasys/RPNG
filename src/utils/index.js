import jwt from 'jsonwebtoken';
/* eslint-disable import/prefer-default-export */
import { Users } from '../../sequelize/models';

export const signToken = (username, id) => {
  const token = jwt.sign(
    {
      username,
      userId: id,
    },
    process.env.SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '1d',
    },
  );
  return token;
};

export const saveUser = async (req, h) => {
  try {
    const { name, username, id } = await Users.create(req);
    const token = signToken(username, id);
    return h.response({ message: `${name}'s account successfully created`, token }).code(201);
  } catch ({ errors }) {
    return h.response({ error: errors[0].message }).code(400);
  }
};
