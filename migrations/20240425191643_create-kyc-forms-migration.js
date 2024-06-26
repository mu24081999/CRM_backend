/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("kyc-forms", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    table.string("firstname").nullable();
    table.string("lastname").nullable();
    table.string("martial_status").nullable();
    table.string("gender").nullable();
    table.string("nationality").nullable();
    table.string("company_details").nullable();
    table.string("company_do").nullable();
    table.string("company_size").nullable();
    table.string("company_type").nullable();
    table.date("date_of_birth").nullable();
    table.string("email").nullable();
    table.string("phone").nullable();
    table.string("state").nullable();
    table.string("city").nullable();
    table.string("address").nullable();
    table.string("zip_code").nullable();
    table.string("document_type").nullable();
    table.string("document_url").nullable();
    table.boolean("is_policy_accepted").nullable().defaultTo(0);
    table.boolean("is_approved").nullable().defaultTo(0);
    table.integer("approved_by").unsigned().nullable();

    table.text("signature_data", "long_text").nullable();
    table.string("status").nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("kyc-forms");
};
