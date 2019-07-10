import Joi from 'joi';
import GenerateNumber from '../services';

export const generateNumber = {
  method: 'POST',
  path: '/generate',
  options: {
    description: 'Generate new number',
    tags: ['api'],
  },
  async handler(request, h) {
    const user = new GenerateNumber(h, this.path);
    try {
      return user.generateRandomNumbers();
    } catch (error) {
      return h.response({ error }).code(500);
    }
  },
};

export const fetchNumbers = {
  method: 'GET',
  path: '/numbers',
  options: {
    description: 'Fetch all numbers',
    tags: ['api'],
    validate: {
      query: Joi.object().keys({
        sort: Joi.string()
          .default('DESC')
          .valid('ASC', 'DESC')
          .error(() => ({
            message: 'You can only sort by Desc or Asc',
          })),
      }),
    },
  },
  async handler(request, h) {
    const { sort } = request.query;
    const user = new GenerateNumber(h, this.path);
    try {
      let list = await user.getAllNumbers();
      let max = 0;
      let min = 0;
      list = list.split('\n').filter(Boolean);

      if (sort === 'ASC') {
        list.sort((a, b) => b - a);
        [max] = list;
        min = list[list.length - 1];
      } else {
        list.sort((a, b) => a - b);
        [min] = list;
        max = list[list.length - 1];
      }

      const meta = {
        total: list.length,
        sort,
        max,
        min,
      };
      return h.response({
        message: 'List of numbers currently in our file',
        numbers: list,
        meta,
      });
    } catch (error) {
      return h.response({ error }).code(500);
    }
  },
};
