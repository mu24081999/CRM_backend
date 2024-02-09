/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("todos_categories", (table) => {
    table.increments("id").primary();
    table.string("name").nullable();
    table.string("description").nullable();
    table.enum("status", ["active", "blocked"]);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("todos_categories");
};
