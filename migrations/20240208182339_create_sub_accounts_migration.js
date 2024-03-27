/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sub_accounts", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable(); // New field for parent email id
    table.string("friendlyName").notNullable();
    table.string("sid").notNullable();
    table.string("status").notNullable();
    table.string("authToken").notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("phoneNumber").notNullable();
    table.string("password").notNullable();
    table.string("type").notNullable();
    table.json("subresourceUris").nullable();
    table.string("uri").nullable();
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
