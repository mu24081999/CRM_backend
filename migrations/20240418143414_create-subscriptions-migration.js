/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("subscriptions", (table) => {
    // Define columns for the subscription table
    table.increments("id").primary(); // Primary key: ID column
    table.integer("customer_id").unsigned().notNullable(); // Customer ID (Foreign key to customer table)
    table.enum("plan_type", ["monthly", "yearly"]).notNullable(); // Subscription plan (e.g., basic, premium)
    table.string("plan").notNullable();
    table.string("amount_payed").notNullable();
    table.date("start_date").notNullable(); // Start date of the subscription
    table.date("end_date"); // End date of the subscription (nullable, open-ended)
    table.boolean("active").defaultTo(true); // Is the subscription active?

    // Optional: Add created_at and updated_at timestamps
    table.timestamps(true, true);

    // Foreign key constraints
    // Assuming you have a customers table, you can add a foreign key constraint
    table
      .foreign("customer_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("subscriptions");
};
