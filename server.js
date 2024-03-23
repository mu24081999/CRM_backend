const express = require("express");
const path = require("path");
global.base_path = __dirname;
global.config = require(base_path + "/config");
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
const multer = require("multer");
const twilio = require("twilio");
const { Storage } = require("@google-cloud/storage");

//Google Cloud Storage
global.storage = new Storage({
  keyFilename: __dirname + "/justcall-378101-79e45cb3c455.json",
});

//Twillio Connection
const accountSid = config.TWILLIO_ACCOUNT_SID;
const authToken = config.TWILLIO_AUTH_TOKEN;
global.twilioClient = twilio(accountSid, authToken);

const AWS = require("aws-sdk");
// Set AWS credentials and region
AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
});
global.connect = new AWS.Connect();
global.s3 = new AWS.S3();
global.upload = multer({ dest: "uploads/" });
// const { Logger } = require("winston");

//Global variables
global.db = knex(knexConfig);
// console.log(dbConnection.connect_database().connectionParams);
// global.db = knex();
async function conn() {
  const connection = await dbConnection.connect_database();
}
conn();
//Database connection

global.app = express();
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
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//Allow requests from the client
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
//error handling middleware
app.use((error, req, res, next) => {
  logger.error(`Error :: ${req.originalUrl} :: ${error}`);

  const status = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  const message =
    error.message || "Something went wrong, please try again later";

  res.status(status).json({ success: false, msg: message });
});
const xmlFilePath = path.join(__dirname, "voice.xml");
// Define a route to serve XML data
app.get("/v1/user/calling/voice.xml", (req, res) => {
  // Read the XML file
  fs.readFile(xmlFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading XML file:", err);
      return res.status(500).send("Internal Server Error" + err);
    }

    // Set the Content-Type header to indicate XML format
    res.set("Content-Type", "application/xml");

    // Send the XML file content as response
    res.send(data);
  });
});
//Welcome Api
app.get("/", (req, res) => {
  res.send("Welcome ...");
});

//Routes
const routes = require("./routes");
const port = config.PORT;
const server = http.createServer(app);
const { Server } = require("socket.io");
global.io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const socketLogic = require("./socket");
const { error } = require("console");
server.listen(port, () => {
  console.log("Server listening on port " + port);
});
