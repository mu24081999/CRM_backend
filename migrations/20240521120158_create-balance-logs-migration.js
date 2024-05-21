/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("balance_logs", (table) => {
    table.increments("id").primary();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("description").notNullable();
    table.string("amount_payed").notNullable();
    table.string("prev_balance").notNullable();
    table.string("curr_balance").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("balance_logs");
};
