// eslint-disable-next-line no-unused-vars
exports.up = (knex, Promise) => knex.schema.createTable('users', (users) => {
  users.increments();

  // Data
  users.string('name', 50).notNullable();
  users
    .string('username', 50)
    .notNullable()
    .unique();
  users
    .string('email', 250)
    .notNullable()
    .unique();
  users.string('password', 128).notNullable();
  users
    .string('userId', 50)
    .notNullable()
    .unique();

  users.timestamp('created_at').notNullable();
  users.timestamp('updated_at').notNullable();
});

// eslint-disable-next-line no-unused-vars
exports.down = (knex, Promise) => knex.schema.dropTableIfExists('users');
