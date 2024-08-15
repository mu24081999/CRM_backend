const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");
const cloudinary = require("cloudinary");
const fs = require("fs");

exports.uploadCloudinaryFile = catchAssyncFunc(async function (req, res, next) {
  const { file } = req.files;
  // const result = cloudinary.uploader
  //   .upload(file.tempFilePath, {
  //     resource_type: "auto",
  //     folder: "testing_images",
  //   })
  //   .then((res) => {
  //     res.json({ url: res });
  //   })
  //   .catch((err) => {
  //     res.json({ error: err });
  //   });
  // const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }
  fs.readFile(file.tempFilePath, async (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }
    // Set up parameters for the S3 upload
    const params = {
      Bucket: config.DIGITAL_OCEAN_BUCKET_NAME,
      Key: file.name, // The name of the file in the Space
      Body: data,
      ACL: "public-read", // Optional: makes the file publicly accessible
    };

    // Upload the file to DigitalOcean Spaces
    s3.upload(params, (err, data) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(500).send("Error uploading file.");
      }

      console.log("File uploaded successfully:", data.Location);
      res.status(200).send(`File uploaded successfully. URL: ${data.Location}`);
    });
  });
});
exports.degitalOceanFile = catchAssyncFunc(async function (req, res, next) {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  // Set up parameters for the S3 upload
  const params = {
    Bucket: config.DIGITAL_OCEAN_BUCKET_NAME,
    Key: file.originalname, // The name of the file in the Space
    Body: file.buffer,
    ACL: "public-read", // Optional: makes the file publicly accessible
  };

  // Upload the file to DigitalOcean Spaces
  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).send("Error uploading file.");
    }

    console.log("File uploaded successfully:", data.Location);
    res.status(200).send(`File uploaded successfully. URL: ${data.Location}`);
  });
});
exports.getUserAgents = catchAssyncFunc(async function (req, res, next) {
  const { user_id } = req.params;
  const agents = await db("agents").where("user_id", user_id).select();
  return helper.sendSuccess(
    req,
    res,
    {
      agentsData: agents,
    },
    "success"
  );
});

exports.readAgent = catchAssyncFunc(async function (req, res, next) {
  const { agent_id } = req.params;
  const agent = await db("agents").where("id", agent_id).first();
  return helper.sendSuccess(req, res, { agentData: agent }, "success");
});
exports.softDeleteAgent = catchAssyncFunc(async function (req, res, next) {
  const { agent_id } = req.params;
  const is_deleted = await db("agents").where("id", agent_id).update({
    status: "blocked",
  });
  return helper.sendSuccess(req, res, {}, "Agent Deleted!");
});
exports.addAgent = catchAssyncFunc(async function (req, res, next) {
  const { username, name, email, phone, status, accountSid, authToken } =
    req.body;
  console.log(req.body);
  const is_exist_agent = await db("agents")
    .where("email", email)
    .orWhere("username", username)
    .first();
  if (is_exist_agent) {
    return helper.sendError(
      req,
      res,
      {},
      "Aggent with this email/username already exists"
    );
  }

  const userParams = {
    name,
    username,
    email,
    role,
    phone: phone,
    status: status,
    accountSid,
    authToken,
  };
  const is_added = await db("agents").insert(userParams);
  // .where("username", username)
  // .update(userParams);
  if (is_added) return helper.sendSuccess(req, res, {}, "Agent Created!");
});
exports.updateAgent = catchAssyncFunc(async function (req, res, next) {
  const { agent_id } = req.params;
  const { username, name, email, phoneNumber, status, accountSid, authToken } =
    req.body;
  console.log(req.body);
  const is_exist_agent = await db("agents")
    .where("email", email)
    .orWhere("username", username)
    .first();
  if (!is_exist_agent) {
    return helper.sendSuccess(
      req,
      res,
      {},
      "Aggent with this email/username not exists"
    );
  }

  const userParams = {
    name,
    username,
    email,
    role,
    phone: phoneNumber,
    status: status,
    accountSid,
    authToken,
  };
  const is_updated = await db("agents")
    .where("id", agent_id)
    .update(userParams);

  if (is_updated) return helper.sendSuccess(req, res, {}, "Agent Updated!");
});
