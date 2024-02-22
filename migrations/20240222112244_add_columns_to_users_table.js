exports.up = function (knex) {
  return knex.schema.table("users", function (table) {
    table.string("socket_id");
    table.boolean("connected").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", function (table) {
    table.dropColumn("socket_id");
    table.dropColumn("connected");
  });
};
