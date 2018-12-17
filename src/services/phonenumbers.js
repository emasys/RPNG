import { writeFile, readFile } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export const generateRandomNumbers = async (request, h) => {
  const zero = 0;
  const rand = Math.random();
  const str = rand.toString();
  const num = str.slice(2, 11);
  const phoneNumber = `${zero + num}\n`;
  const latest = zero + num;

  const initialList = await readFile('phoneNumber.txt');
  const makeArray = initialList.split('\n');

  const isDuplicate = makeArray.find(prevNum => prevNum === latest);
  if (isDuplicate) {
    return h.response({ error: 'an error occurred, please try again' }).code(409);
  }

  await writeFile('phoneNumber.txt', phoneNumber);
  const latestList = await readFile('phoneNumber.txt');
  return h.response({ 'all phone numbers': latestList, 'recently added': latest }).code(201);
};
