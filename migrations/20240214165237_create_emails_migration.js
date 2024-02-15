exports.up = function (knex) {
  return knex.schema.createTable("emails", function (table) {
    table.increments("id").primary();
    table.string("subject").notNullable();
    table.text("body").notNullable();
    table.string("sender").notNullable();
    table.string("reciever").notNullable();
    table.boolean("is_read").defaultTo(false);
    table.boolean("is_deleted").defaultTo(false);
    table.integer("parent_id").unsigned(); // New field for parent email id
    table.foreign("parent_id").references("id").inTable("emails"); // Foreign key constraint

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("emails");
};
