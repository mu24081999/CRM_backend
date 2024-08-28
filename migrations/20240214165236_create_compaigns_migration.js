exports.up = function (knex) {
  return knex.schema.createTable("campaigns", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.string("name").notNullable(); // Name of the campaign
    table.string("description"); // Description of the campaign
    table.string("status").notNullable().defaultTo("pending"); // Status (e.g., pending, sent, etc.)
    table.timestamp("scheduled_time"); // When the campaign is scheduled to be sent
    table.timestamp("sent_time"); // When the campaign was actually sent
    table.integer("total_emails").defaultTo(0); // Total emails to be sent
    table.integer("emails_sent").defaultTo(0); // Emails that have been sent so far
    table.integer("emails_failed").defaultTo(0); // Emails that failed to send
    table.string("email_type"); // Type of email (e.g., marketing, transactional, etc.)
    table.string("mail_provider"); // Mail provider used for sending emails
    table.string("from_email").notNullable(); // Sender's email address
    table.string("from_name").notNullable(); // Sender's name
    table.text("subject").notNullable(); // Subject of the email
    table.text("body").notNullable(); // Body content of the email
    table.integer("created_by").unsigned().references("id").inTable("users"); // Foreign key referencing the user who created the campaign
    table.timestamps(true, true);

    table.index("status"); // Index for faster querying by status
    table.index("scheduled_time"); // Index for scheduling queries
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("campaigns");
};
