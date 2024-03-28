/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createSchema("agents", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable(); // New field for parent email id
    table.string("sid").notNullable();
    table.string("status").notNullable();
    table.string("authToken").notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("phoneNumber").notNullable();
    table.string("password").notNullable();
    table.string("role").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("agents");
};
