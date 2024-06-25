/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("twilio_pricing", (table) => {
    table.increments("id").primary();
    table.string("country_name").nullable();
    table.string("country_code").nullable();
    table.string("inbound_sms_pricing").nullable();
    table.string("outbound_sms_pricing").nullable();
    table.string("inbound_voice_pricing").nullable();
    table.string("outbound_voice_pricing").nullable();

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
