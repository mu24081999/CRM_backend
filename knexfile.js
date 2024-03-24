global.base_path = __dirname;
global.config = require(base_path + "/config");
module.exports = {
  client: "mysql2",
  connection: {
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
    database: config.DB_NAME,
    timezone: "+05:00", // Set the timezone for Pakistan
  },
  pool: {
    afterCreate: function (connection, callback) {
      connection.query("SET time_zone = '+05:00';", function (err) {
        callback(err, connection);
      });
    },
  },
  // connection: config.POSTGRESS_URL,
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
