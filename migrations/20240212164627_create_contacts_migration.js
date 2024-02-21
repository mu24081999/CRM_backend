/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("contacts", (table) => {
    table.increments("id").primary();
    table.string("avatar").nullable();
    table.string("phone").nullable();
    table.string("firstname").notNullable();
    table.string("middlename").nullable();
    table.string("lastname").nullable();
    table.string("email").unique().notNullable();
    table.string("country").nullable();
    table.string("state").nullable();
    table.string("city").nullable();
    table.string("company_name").notNullable();
    table.string("designation").notNullable();
    table.string("website").notNullable();
    table.string("work_phone").notNullable();
    table.text("biography").notNullable();
    table.json("tags").nullable();
    table.json("social_links").nullable();
    table.string("role").nullable();
    table.enum("status", ["active", "blocked"]);
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
