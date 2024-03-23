const PORT = 7000;
const SESSION_SECRET = "12345678$@123";
// DB Config
const DB_HOST = "127.0.0.1";
const DB_PORT = 3306;
const DB_PASSWORD = "";
const DB_USER = "root";
const DB_NAME = "CRM";
// const DB_HOST = "127.0.0.1";
// const DB_PORT = 3306;
// const DB_PASSWORD = "12345678";
// const DB_USER = "root";
// const DB_NAME = "CRM";

// const DB_HOST = "database-crm.cle0a4gs64yq.us-west-2.rds.amazonaws.com";
// const DB_PORT = "3306";
// const DB_PASSWORD = "12345678";
// const DB_USER = "admin";
// const DB_NAME = "crm";

// # //JWT config
const JWT_SECRET = "1212345678$@123";

// # Email configuration
const EMAIL_FROM_ACC = "mu24081999@gmail.com";
const EMAIL_FROM_ACC_PASS = "isqzrulwfzdkitpl";

// # AWS configuration
// # AWS_ACCESS_KEY = AKIAX2CISY6LNJB3XTIK
// # AWS_SECRET_ACCESS_KEY = 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
// # S3_BUCKET = jampackcrm
// # AWS_REGION ="eu-west-2"
const AWS_ACCESS_KEY = "AKIAU6GDZ3SSI7CWYU75";
// const AWS_ACCESS_KEY = "AKIAU6GDZ3SSOD66PC65";
const AWS_SECRET_ACCESS_KEY = "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";
// const AWS_SECRET_ACCESS_KEY = "LnYQsMC+DeR5RKSkHPErzqGxA4NxMUimqSNXtCh4";
const S3_BUCKET = "crmbucketahmedasif";
const AWS_REGION = "us-west-2";

//Twillio config
const TWILLIO_ACCOUNT_SID = "AC1237366c79ad62eb76b0e0775cf053d3";
const TWILLIO_AUTH_TOKEN = "39a1a699c20634690e6e1c935cfeda9d";
const TWILIO_VOICE_API_KEY_AUTH_TOKEN = "SRJg8z8zxs5n5pz0az9FrI0thK2tTcaz";
const TWILIO_API_KEY = "SKb57d557256c5005ddd8f6b0662b9817f";
const TWILIO_TWIML_SID = "APde731d63e525cdb48761eace9d336cf8";
module.exports = {
  AWS_REGION,
  S3_BUCKET,
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY,
  EMAIL_FROM_ACC_PASS,
  EMAIL_FROM_ACC,
  JWT_SECRET,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_HOST,
  SESSION_SECRET,
  PORT,
  TWILLIO_AUTH_TOKEN,
  TWILLIO_ACCOUNT_SID,
  TWILIO_VOICE_API_KEY_AUTH_TOKEN,
  TWILIO_API_KEY,
  TWILIO_TWIML_SID,
};
