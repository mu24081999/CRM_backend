/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("contacts", (table) => {
    table.increments("id").primary();
    table.bigInteger("board_id").unsigned().notNullable();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("avatar").nullable();
    table.string("phone").notNullable();
    table.string("firstname").notNullable();
    table.string("middlename").nullable();
    table.string("lastname").nullable();
    table.string("email").unique().notNullable();
    table.string("country").nullable();
    table.string("state").nullable();
    table.string("city").nullable();
    table.string("company_name").nullable();
    table.string("designation").nullable();
    table.string("website").nullable();
    table.string("work_phone").nullable();
    table.text("biography").nullable();
    table.json("tags").nullable();
    table.json("social_links").nullable();
    table.string("role").nullable();
    table.enum("status", [
      "active",
      "blocked",
      "pending",
      "in-progress",
      "completed",
      "important",
      "archived",
    ]);
    table.enum("board_status", ["pending", "in-progress", "completed"]);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("contacts");
};
