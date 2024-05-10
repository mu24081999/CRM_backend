/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("messages", (table) => {
    table.increments("id").primary();
    table.string("from_phone").notNullable();
    table.string("to_phone").notNullable();
    table.string("from_name").nullable();
    table.string("to_name").nullable();
    table.json("to").nullable();
    table.string("message").notNullable();
    table.string("sid").nullable();
    table.double("price").nullable();
    table.string("account_sid").notNullable();
    table.string("uri").nullable();
    table.integer("num_media").nullable();
    table.json("media_urls").nullable();
    table.string("status").nullable();
    table.string("message_error").nullable();
    table.enum("direction", ["inbound", "outbound"]).defaultTo("outbound");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("messages");
};
