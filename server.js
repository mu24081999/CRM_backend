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
const https = require("https");
const knexConfig = require("./knexfile");
const knex = require("knex");
const dbConnection = require("./config/database");
const multer = require("multer");
const twilio = require("twilio");
const { Storage } = require("@google-cloud/storage");
global.passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

//Google Cloud Storage
global.storage = new Storage({
  keyFilename: __dirname + "/justcall-378101-85a5c9fa46e9.json",
  projectId: "justcall-378101",
});
const { GoogleAuth } = require("google-auth-library");

// Set the path to the keyfile using environment variable
process.env.GOOGLE_APPLICATION_CREDENTIALS =
  "justcall-378101-85a5c9fa46e9.json";
async function authenticate() {
  const auth = new GoogleAuth();
  const client = await auth.getClient();
  // console.log("🚀 ~ authenticate ~ client:", client);
  // Use the authenticated client to make API requests
}

authenticate();

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
  // console.log("🚀 ~ conn ~ connection:", connection);
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
    saveUninitialized: true,
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "73457248543-vn1bjkn98qogdcljl35job6ek20e82qt.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://app.desktopcrm.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  )
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
//Allow requests from the client
// app.use(
//   cors({
//     // origin: "http://34.72.165.103",
//     // origin: ["https://203.161.50.83", "https://desktopcrm.com"],
//     // origin: "https://desktopcrm.com",
//     // origin: "*",
//     origin: [
//       "https://desktopcrm.com",
//       "https://www.desktopcrm.com",
//       "https://desktopcrm.com",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );
var whitelist = [
  "https://desktopcrm.com",
  "https://www.desktopcrm.com",
  "https://app.desktopcrm.com",
  "https://localhost:3000",
];

var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
    // if (whitelist.indexOf(origin) !== -1) {
    // } else {
    //   callback(new Error("Not allowed by CORS"));
    // }
  },
};
app.use(cors(corsOptions));

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
app.get("/auth/google/callback", (req, res) => {
  passport.authenticate("google", { failureRedirect: "/" }),
    (err, user, info) => {
      // Successful authentication, redirect home
      console.log(user, info, err);
    };
});
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

app.get("/v1/user/template/template.css", (req, res) => {
  res.sendFile(path.join(__dirname, "template.css"));
});
// //Welcome Api
// app.get("/", (req, res) => {
//   res.send("Welcome ...");
// });
// Define a route for the root URL '/'
app.get("/", (req, res) => {
  // Send the 'index.html' file when the root URL is accessed
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Handle health check requests
app.get("/_ah/health", (req, res) => {
  res.status(200).send("Healthy");
});

//Routes
const routes = require("./routes");
const port = process.env.PORT || config.PORT;
const HOST = "0.0.0.0"; // Listen on all interfaces

const options = {
  key: fs.readFileSync("desktopcrm.key"),
  // key: fs.readFileSync("app.desktopcrm.com.key"),
  // cert: fs.readFileSync("app_desktopcrm_com.crt"),
  cert: fs.readFileSync("desktopcrm_com.crt"),
  // ca: fs.readFileSync("app_desktopcrm_com.ca-bundle"),
  ca: fs.readFileSync("desktopcrm_com.ca-bundle"),
};
const server = https.createServer(options, app);

// const server = http.createServer(app);adf
const { Server } = require("socket.io");
global.io = new Server(server, {
  cors: {
    // origin: "https://justcall-one.vercel.app",
    // origin: ["https://203.161.50.83", "https://desktopcrm.com"],
    // origin: "http://desktopcrm.com",
    origin: [
      "https://desktopcrm.com",
      "https://www.desktopcrm.com",
      "https://app.desktopcrm.com",
      "https://localhost:3000",
      "http://localhost:3000",
    ],
    // origin: "*",
    // origin: "http://34.72.165.103",
    methods: ["GET", "POST"],
  },
});
const os = require("os");
console.log(os.hostname());

const socketLogic = require("./socket");
server.listen(port, HOST, () => {
  console.log("Server listening on port https://localhost:" + port);
});
