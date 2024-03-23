/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("board-tasks", function (table) {
    table.increments("id").primary();
    table.integer("board_id").unsigned().notNullable();
    table.string("name").notNullable();
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.text("description").nullable();
    table.enum("priority", ["high", "medium", "low"]).nullable();
    table.json("asign_to").nullable();
    table
      .enum("status", ["pending", "in-progress", "completed"])
      .defaultTo("pending");
    table.timestamps(true, true);
    // Foreign key constraint
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("board-tasks");
};
