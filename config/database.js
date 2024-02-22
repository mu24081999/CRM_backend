var mysql = require("mysql2");
const logger = require("../utils/winston");
require("dotenv");
console.log({
  // connectionLimit: 10,
  host: config.DB_HOST,
  port: config.DB_PORT, // Specify the port number for your MySQL server
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});
/* Set your database credentials here */
const connection = mysql.createPool({
  // connectionLimit: 10,
  host: config.DB_HOST,
  port: config.DB_PORT, // Specify the port number for your MySQL server
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});
module.exports = {
  connect_database: function () {
    connection.getConnection(function (err, conn) {
      if (!err) {
        logger.info("Database connected successfully.");
      } else {
        logger.error(`ERROR :: Database Connection :: ${err}`);
      }
    });

    return connection;
  },
};
