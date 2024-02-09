/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("chats", function (table) {
    table.increments("id").primary();
    table.string("sender").notNullable();
    table.string("recipient").notNullable();
    table.string("room").notNullable();
    table.string("message").nullable();
    table.string("file_url").nullable();
    table.string("file_key").nullable();
    table.bigint("file_size").nullable();
    table.enum("type", ["text", "file"]).defaultTo("text");
    // table.foreign("sender_id").references("id").inTable("users");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("chats");
};
