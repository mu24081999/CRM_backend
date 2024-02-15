/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("email_attachments", function (table) {
    table.increments("id").primary();
    table.integer("email_id").unsigned().notNullable();
    table.string("file_link").notNullable();
    table.integer("size").unsigned().notNullable();
    table.timestamps(true, true);
    // Foreign key constraint
    table.foreign("email_id").references("id").inTable("emails");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("email_attachments");
};
