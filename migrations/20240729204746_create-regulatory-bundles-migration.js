/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("regulatory-bundles", (table) => {
    table.increments("id").primary();
    table.bigInteger("user_id").notNullable().unsigned();
    table.string("country").nullable();
    table.string("number_type").nullable();
    table.string("end_user_type").nullable();
    table.string("firstname").nullable();
    table.string("lastname").nullable();
    table.string("email").nullable();
    table.string("phone_number").nullable();
    table.string("purpose_phone").nullable();
    table.string("supporting_document").nullable();
    table.string("friendly_name").nullable();
    table.string("business_name").nullable();
    table.string("business_ein").nullable();
    table.string("status").nullable();
    table.string("status_descriptio").nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTableIfExists("regulatory_bundles");
};
