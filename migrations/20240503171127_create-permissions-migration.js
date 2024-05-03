/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("permissions", (table) => {
    table.increments("id").primary();
    table.bigInteger("user_id").unsigned().notNullable();
    table.bigInteger("subaccount_id").unsigned().notNullable();
    table.string("user_role").notNullable();
    table.string("subaccount_role").notNullable();
    table.boolean("dashboard").defaultTo(0);
    table.boolean("email").defaultTo(0);
    table.boolean("sms").defaultTo(0);
    table.boolean("call").defaultTo(0);
    table.boolean("todos").defaultTo(0);
    table.boolean("phone_numbers").defaultTo(0);
    table.boolean("chat").defaultTo(0);
    table.boolean("group_chat").defaultTo(0);
    table.boolean("leads_pipeline").defaultTo(0);
    table.boolean("contacts").defaultTo(0);
    table.boolean("file_manager").defaultTo(0);
    table.boolean("agents").defaultTo(0);
    table.boolean("call_recordings").defaultTo(0);
    table.boolean("blogs").defaultTo(0);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("permissions");
};
