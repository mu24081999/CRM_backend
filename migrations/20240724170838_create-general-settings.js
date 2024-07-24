/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("general-settings", (table) => {
    table.increments("id").primary();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("toll_free_number_price").nullable();
    table.string("local_number_price").nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("general-settings");
};
