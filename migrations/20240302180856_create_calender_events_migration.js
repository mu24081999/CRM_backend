// YYYYMMDDHHMMSS_create_gallery_table.js

exports.up = function (knex) {
  return knex.schema.createTable("calender_events", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description", "longtext").nullable();
    table.date("start_date").notNullable();
    table.time("start_time").notNullable();
    table.date("end_date").notNullable();
    table.time("end_time").notNullable();
    table.string("location").nullable();
    table.string("category").notNullable();
    table.string("visibility").notNullable();
    table.string("event_color").notNullable();
    table.string("priority").notNullable();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("user_name").notNullable();
    table.string("user_image").notNullable();
    table.json("team_members").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
