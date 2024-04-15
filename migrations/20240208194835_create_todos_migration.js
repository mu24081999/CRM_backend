/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("todos", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.bigInteger("code").notNullable();
    table.text("description").nullable();
    table.date("start_date").notNullable();
    table.time("start_time").notNullable();
    table.date("end_date").notNullable();
    table.time("end_time").notNullable();
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("todos_categories")
      .nullable();
    table
      .enum("status", ["to-do", "on-hold", "in-progress", "done", "pending"])
      .defaultTo("to-do");
    table.enum("priority", ["high", "medium", "low"]).defaultTo("high");
    table.json("asign_to").nullable();
    table.json("labels").nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("todos");
};
