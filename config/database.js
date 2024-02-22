var mysql = require("mysql2");
const logger = require("../utils/winston");
require("dotenv");
console.log({
  // connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Specify the port number for your MySQL server
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
/* Set your database credentials here */
const connection = mysql.createPool({
  // connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Specify the port number for your MySQL server
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
