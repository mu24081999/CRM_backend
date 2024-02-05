/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sessions", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.string("token").notNullable();
    table.datetime("expires_at").notNullable();
    table.foreign("user_id").references("id").inTable("users");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("sessions");
};
