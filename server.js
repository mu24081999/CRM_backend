const express = require("express");
const path = require("path");
const cors = require("cors");
var fileUpload = require("express-fileupload");
const logger = require("./utils/winston");
const { StatusCodes } = require("http-status-codes");
const session = require("express-session");
const fs = require("fs");
const http = require("http");
const knexConfig = require("./knexfile");
const knex = require("knex");
const dbConnection = require("./config/database");

// const { Logger } = require("winston");

//Global variables
global.db = knex(knexConfig);
//Database connection
dbConnection.connect_database();

const app = express();
require("dotenv").config({ path: path.join(__dirname, ".env") });

// Setting parsers for parsing the incoming data
app.use(
  express.urlencoded({ limit: "1000mb", extended: true, parameterLimit: 50000 })
); // x-www-form-urlencoded <form>
app.use(express.raw({ limit: "1000mb" }));
app.use(express.json({ limit: "1000mb" })); // application/json

//upload files
// default options
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: __dirname + "/uploads/",
  })
);

//Setting up sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//Allow requests from the client
app.use(cors());
//error handling middleware
app.use((error, req, res, next) => {
  logger.error(`Error :: ${req.originalUrl} :: ${error}`);

  const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  const message =
    error.message || "Something went wrong, please try again later";

  res.status(status).json({ success: false, msg: message });
});

//Welcome Api
app.get("/", (req, res) => {
  res.send("Welcome ...");
});

//Routes
const authRoutes = require("./routes/auth");

app.use("/v1/auth", authRoutes);

const port = process.env.PORT;
const server = http.createServer(app);
server.listen(port, () => {
  console.log("Server listening on port " + port);
});
