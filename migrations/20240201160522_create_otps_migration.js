exports.up = function (knex) {
  return knex.schema.createTable("otps", function (table) {
    table.increments("id").primary();
    table.bigInteger("phone").nullable();
    table.string("email").nullable();
    table.bigInteger("otp").notNullable();
    table.string("messageSid").nullable();
    table.datetime("expires_at").notNullable();
    // Add more columns as needed
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("otps");
};
