/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("verifications", (table) => {
    table.increments("id").primary();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("username").notNullable();
    table.string("legal_business_name").notNullable();
    table.string("business_type").notNullable();
    table.string("business_registration_id_type").notNullable();
    table.string("business_reg_no").notNullable();
    table.string("business_industry").notNullable();
    table.string("website_url").notNullable();
    table.string("rigion").notNullable();
    table.string("street").notNullable();
    table.string("city").notNullable();
    table.string("postal_code").notNullable();
    table.string("country").notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("phone_number").notNullable();
    table.string("brand_type").notNullable();
    table.string("amount_paid").notNullable();
    table
      .enum("status", ["pending", "verified", "rejected"])
      .defaultTo("pending");
    table.enum("payment_status", ["paid", "pending"]).defaultTo("pending");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("verifications");
};
