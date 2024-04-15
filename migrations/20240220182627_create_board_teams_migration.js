/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("board_teams", function (table) {
    table.increments("id").primary();
    table.bigInteger("user_id").unsigned().nullable();
    table.string("email").notNullable();
    table.string("name").notNullable();
    table.string("image").nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("board_teams");
};
