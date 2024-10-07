global.base_path = __dirname;
global.config = require(base_path + "/config");
module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    timezone: "+05:00", // Set the timezone for Pakistan
  },
  pool: {
    afterCreate: function (connection, callback) {
      connection.query("SET time_zone = '+05:00';", function (err) {
        callback(err, connection);
      });
    },
  },
  // connection: process.env.POSTGRESS_URL,
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
