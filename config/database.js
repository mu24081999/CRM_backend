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
// const { Connector } = require("@google-cloud/cloud-sql-connector");
// var mysql = require("mysql2/promise");
// const path = require("path");
// const logger = require("../utils/winston");
// require("dotenv");
// const keyFilePath =
//   "/Users/macos/Documents/Repositories/CRM_backend/justcall-378101-79e45cb3c455.json";
// // console.log("🚀 ~ keyFilePath:", keyFilePath);

// async function db(params) {
//   const connector = new Connector({
//     keyFilePath: keyFilePath,
//     projectId: "justcall-378101",
//   });

//   // const connector = new Connector();

//   const clientOpts = await connector.getOptions({
//     instanceConnectionName: "justcall-378101:us-central1:crm-justcall",
//     ipType: "PUBLIC",
//   });
//   // console.log("🚀 ~ db ~ clientOpts:", clientOpts);
//   const connectionParams = {
//     // connectionLimit: 10,
//     // ...clientOpts,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT, // Specify the port number for your MySQL server
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   };
//   /* Set your database credentials here */
//   const connection = mysql.createPool(connectionParams);

//   return { connection: connection, connectionParams: connectionParams };
// }
// // console.log("🚀 ~ connection:", connection);

// module.exports = {
//   connect_database: async function () {
//     const conn = await db();
//     if (conn) {
//       const connect = await conn?.connection.getConnection();
//       if (connect) logger.info("Database connected successfully.");
//       return { connection: conn, connectionParams: conn.connectionParams };
//     }
//   },
// };
// // export GOOGLE_APPLICATION_CREDENTIALS =
