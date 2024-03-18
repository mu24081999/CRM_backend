// YYYYMMDDHHMMSS_create_gallery_table.js

exports.up = function (knex) {
  return knex.schema.createTable("invoices", function (table) {
    table.increments("id").primary();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("user_name").notNullable();
    table.string("user_image").nullable();
    table.string("logo").nullable();
    table.string("title").nullable();
    table.json("business_info").nullable();
    table.json("invoice_details").nullable();
    table.json("bill_details").nullable();
    table.json("shipping_info").nullable();
    table.json("invoice_items").nullable();
    table.json("conditions").nullable();
    table.double("subtotal").nullable();
    table.double("discount").nullable();
    table.double("extra_discount_percentage").nullable();
    table.double("discount_total").nullable();
    table.double("total").nullable();
    table.string("from_name").nullable();
    table.string("from_label").nullable();
    table.string("personal_memo").nullable();
    table.string("note_to_client").nullable();
    table.enum("status", ["paid", "unpaid", "draft"]).defaultTo("unpaid");
    table
      .enum("activity", ["sent", "done", "", "blocked", "archived"])
      .nullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("invoices");
};
