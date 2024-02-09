/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sub_accounts", (table) => {
    table.increments("id").primary();
    table.string("avatar").nullable();
    table.string("phone").nullable();
    table.string("name").notNullable();
    table.string("username").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.json("tags").nullable();
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
  return knex.schema.dropTableIfExists("sub_accounts");
};
