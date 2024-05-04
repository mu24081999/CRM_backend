/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cards", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable(); // New field for parent email id
    table.string("card_number").notNullable().unique();
    table.string("cardholder_name").notNullable();
    table.string("expiration_date").notNullable();
    table.integer("cvc", 3).notNullable();
    table.string("firstname").nullable();
    table.string("lastname").nullable();
    table.string("address").nullable();
    table.string("state").nullable();
    table.string("city").nullable();
    table.string("country").nullable();
    table.string("zip_code").nullable();

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cards");
};
