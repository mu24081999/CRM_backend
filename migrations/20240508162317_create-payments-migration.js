/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("payments", (table) => {
    table.increments("id").primary();
    table
      .bigInteger("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table.string("card_holder_name").notNullable();
    table.string("card_number").nullable();
    table.string("cvc").nullable();
    table.date("expiration").nullable();
    table.integer("postal_code").nullable();
    table.string("amount").notNullable();
    table.boolean("policy_accepted").defaultTo(false);
    table.string("description").nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("payments");
};
