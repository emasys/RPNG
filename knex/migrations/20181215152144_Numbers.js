// eslint-disable-next-line no-unused-vars
exports.up = (knex, Promise) => knex.schema.createTable('numbers', (numbers) => {
  numbers.increments().primary();
  numbers
    .string('creator', 36)
    .references('userId')
    .inTable('users');

  numbers.integer('phone', 10).notNullable();
  numbers
    .string('numId', 36)
    .notNullable()
    .unique();

  numbers.timestamp('created_at').notNullable();
  numbers.timestamp('updated_at').notNullable();
});

// eslint-disable-next-line no-unused-vars
exports.down = (knex, Promise) => knex.schema.dropTableIfExists('numbers');
