/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tickets", (table) => {
    table.increments("id").primary();
    table.bigInteger("user_id").unsigned().notNullable();
    table.bigInteger("responder_id").unsigned().nullable();
    table.string("user_name").notNullable();
    table.string("user_email").notNullable();
    table.string("subject").notNullable();
    table.text("problem", "longtext").notNullable();
    table.string("responder_name").nullable();
    table.string("responder_email").nullable();
    table.string("responder_role").nullable();
    table.text("solution", "longtext").nullable();
    table
      .enum("status", ["pending", "responded", "rejected"])
      .defaultTo("pending");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tickets");
};
