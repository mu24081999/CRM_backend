/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("chat_rooms", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("user_id_1").unsigned().notNullable();
    table.string("user_name_1").notNullable();
    table.string("user_image_1").nullable();
    table.string("user_name_2").notNullable();
    table.string("user_image_2").nullable();
    table.integer("user_id_2").unsigned().notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("chat_rooms");
};
