import { PhoneNumbers } from '../../sequelize/models';

// eslint-disable-next-line import/prefer-default-export
export const generateRandomNumbers = async (request, h) => {
  const zero = 0;
  const rand = Math.random();
  const str = rand.toString();
  const num = str.slice(2, 11);
  const phoneNumber = zero + num;
  const creator = request.auth.credentials.userId;

  const response = await PhoneNumbers.findOne({ where: { phoneNumber } });
  if (response) {
    return h.response({ error: 'Something went wrong, try again' }).code(400);
  }
  try {
    const row = await PhoneNumbers.create({ phoneNumber, creator });
    return h.response({ message: row }).code(201);
  } catch (error) {
    return h.response({ error });
  }
};
