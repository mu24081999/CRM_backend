const winston = require("winston");

const moment = require("moment-timezone");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => moment().tz("Asia/Karachi").format("DD-MM-YYYY hh:mm:ss A"),
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: "Total" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/activity/activity.log",
      level: "info",
    }),
  ],
});

module.exports = logger;
