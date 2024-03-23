require("dotenv").config();
global.base_path = __dirname;
global.config = require(base_path + "/config");
module.exports = {
  client: "mysql2",
  connection: {
    host: "35.226.237.203",
    // host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    // Add more configuration options if needed
    pool: {
      min: 2, // Minimum number of connections in the pool
      max: 10, // Maximum number of connections in the pool
      acquireTimeoutMillis: 600000, // Timeout in milliseconds to acquire a connection
      idleTimeoutMillis: 600000, // Timeout in milliseconds to keep a connection idle
    },
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
