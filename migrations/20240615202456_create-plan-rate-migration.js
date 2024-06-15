/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("plan-rates", (table) => {
    table.increments("id").primary();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("starter").notNullable();
    table.string("growth").notNullable();
    table.string("enterprise").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("plan-rates");
};
