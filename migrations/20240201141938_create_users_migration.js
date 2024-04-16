/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("avatar").nullable();
    table.string("location").nullable();
    table.text("bio").nullable();
    table.string("phone").nullable();
    table.string("name").notNullable();
    table.string("username").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("accountSid").nullable();
    table.string("authToken").nullable();
    table.string("parent_id").nullable();

    // table.string("socket_id").nullable();
    // table.boolean("connected").defaultTo(false);
    table.json("tags").nullable();
    table.json("twilio_numbers").nullable();
    table.string("role").nullable();
    table.string("client_id").nullable();
    table.enum("status", ["active", "blocked"]).defaultTo("active");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
