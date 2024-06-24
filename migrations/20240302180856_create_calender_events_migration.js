// YYYYMMDDHHMMSS_create_gallery_table.js

exports.up = function (knex) {
  return knex.schema.createTable("calender_events", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.enum("type", ["event", "reminder"]).notNullable();
    table.text("description", "longtext").nullable();
    table.date("start_date").notNullable();
    table.time("start_time").notNullable();
    table.date("end_date").nullable();
    table.time("end_time").nullable();
    table.string("location").nullable();
    table.string("category").nullable();
    table.string("visibility").nullable();
    table.string("event_color").nullable();
    table.string("priority").nullable();
    table.bigInteger("user_id").unsigned().notNullable();
    table.string("user_name").notNullable();
    table.string("user_image").nullable();
    table.json("team_members").nullable();
    table.boolean("notified").defualtTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
