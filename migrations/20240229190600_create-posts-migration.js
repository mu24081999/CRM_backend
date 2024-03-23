// YYYYMMDDHHMMSS_create_gallery_table.js

exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("permalink").nullable();
    table.text("post_content", "longtext").notNullable();
    table.string("post_type").notNullable();
    table.string("preview_image").notNullable();
    table.json("slider_images").nullable();
    table.json("tags").nullable();
    table.string("visibility").notNullable();
    table.string("category").notNullable();
    table.date("publish_date").notNullable();
    table.string("status").notNullable();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("user_name").notNullable();
    table.string("user_image").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
