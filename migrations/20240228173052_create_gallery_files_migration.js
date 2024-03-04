// YYYYMMDDHHMMSS_create_gallery_table.js

exports.up = function (knex) {
  return knex.schema.createTable("gallery_files", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("description").nullable();
    table.string("url").notNullable();
    table.string("size").notNullable();
    table.string("type").notNullable();
    table.bigInteger("user_id").unsigned().notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("gallery_files");
};
