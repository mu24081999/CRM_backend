require("dotenv").config();
global.base_path = __dirname;
global.config = require(base_path + "/config");
module.exports = {
  client: "mysql2",
  connection: {
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
