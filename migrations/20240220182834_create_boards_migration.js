/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("boards", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.string("name").notNullable();
    table
      .enum("visibility", ["public", "private", "stared", "deleted"])
      .defaultTo("public");
    table.string("avatar_text").nullable();
    table.string("avatar_color").nullable();
    table.string("image").nullable();
    table.json("team_members").nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("boards");
};
