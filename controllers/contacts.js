const catchAsyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.addContact = catchAsyncFunc(async (req, res, next) => {
  console.log(req.files);
  const tagSchema = Joi.object({
    name: Joi.string().required(),
  });

  const socialSchema = Joi.object({
    name: Joi.string().optional(),
    link: Joi.string().optional(),
  });
  const schema = Joi.object({
    firstname: Joi.string().required(),
    middlename: Joi.string().optional(),
    lastname: Joi.string().optional(),
    biography: Joi.string().optional(),
    phone: Joi.number().integer().required(),
    email: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    company_name: Joi.string().required(),
    designation: Joi.string().required(),
    website: Joi.string().required(),
    work_phone: Joi.number().integer().required(),
    // tags: Joi.array().items(tagSchema).optional(),
    tags: Joi.string().optional(),
    social_links: Joi.string().optional(),
    role: Joi.string().optional(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return helper.sendError(req, res, error, 403);
  }
  const is_exist = await db("contacts")
    .where("email", value.email)
    .orWhere("phone", value.phone)
    .first();
  if (is_exist) {
    return helper.sendError(req, res, " Contact already exist.", 401);
  }
  const { file } = req.files;
  const { name, mimetype, tempFilePath } = file;
  if (file) {
    fs.readFile(tempFilePath, async (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).send("Internal Server Error");
      }
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: name,
        Body: data,
        ContentType: mimetype,
      };
      const is_added = await new Promise((resolve, reject) => {
        s3.upload(params, {}, async (err, data) => {
          if (err) {
            console.error(err);
            reject(new Error("Error Uploading File: " + err));
          } else {
            console.log("File uploaded successfully:", data);

            const is_record_inserted = await db("contacts").insert({
              firstname: value.firstname,
              middlename: value.middlename,
              lastname: value.lastname,
              biography: value.biography,
              website: value.website,
              phone: value.phone,
              email: value.email,
              city: value.city,
              state: value.state,
              country: value.country,
              company_name: value.company_name,
              designation: value.designation,
              work_phone: value.work_phone,
              tags: value.tags,
              social_links: value.social_links,
              role: value.role,
              avatar: data.Location,
            });
            if (!is_record_inserted) {
              return helper.sendError(
                req,
                res,
                "Something went wrong, while creating user.",
                500
              );
            }
            resolve(true);
            return helper.sendSuccess(
              req,
              res,
              {},
              "Contact successfully created."
            );
          }
        });
      });
    });
  }
});
exports.readContact = catchAsyncFunc(async (req, res, next) => {
  const { contact_id } = req.params;
  const is_exist_contact = await db("contacts").where("id", contact_id).first();
  if (!is_exist_contact) {
    return helper.sendError(req, res, "Contact not found.", 404);
  }
  return helper.sendSuccess(
    req,
    res,
    { contactData: is_exist_contact },
    "success"
  );
});
exports.updateContact = catchAsyncFunc(async (req, res, next) => {
  console.log(req.body);
  const schema = Joi.object({
    firstname: Joi.string().optional(),
    middlename: Joi.string().optional(),
    lastname: Joi.string().optional(),
    biography: Joi.string().optional(),
    phone: Joi.number().integer().optional(),
    email: Joi.string().optional(),
    country: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    company_name: Joi.string().optional(),
    designation: Joi.string().optional(),
    website: Joi.string().optional(),
    work_phone: Joi.number().integer().optional(),
    // tags: Joi.array().items(tagSchema).optional(),
    tags: Joi.string().optional(),
    social_links: Joi.string().optional(),
    role: Joi.string().optional(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return helper.sendError(req, res, error, 403);
  }
  const { contact_id } = req.params;
  if (req.files) {
    const { file } = req.files;
    const { name, mimetype, tempFilePath } = file;
    fs.readFile(tempFilePath, async (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).send("Internal Server Error");
      }
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: name,
        Body: data,
        ContentType: mimetype,
      };
      const is_added = await new Promise((resolve, reject) => {
        s3.upload(params, {}, async (err, data) => {
          if (err) {
            console.error(err);
            reject(new Error("Error Uploading File: " + err));
          } else {
            console.log("File uploaded successfully:", data);

            resolve(true);
          }
        });
      });
    });
  }
  const is_record_updated = await db("contacts")
    .where("id", contact_id)
    .update({
      firstname: value.firstname,
      middlename: value.middlename,
      lastname: value.lastname,
      biography: value.biography,
      website: value.website,
      phone: value.phone,
      email: value.email,
      city: value.city,
      state: value.state,
      country: value.country,
      company_name: value.company_name,
      designation: value.designation,
      work_phone: value.work_phone,
      tags: value.tags,
      social_links: value.social_links,
      role: value.role,
      // avatar: data.Location,
    });
  if (!is_record_updated) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating user.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Contact successfully updated.");
});

exports.deleteContact = catchAsyncFunc(async (req, res, next) => {
  const { contact_id } = req.params;
  const is_deleted = await db("contacts")
    .where("id", contact_id)
    .update({ status: "blocked" });

  if (!is_deleted) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while deletiog user.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Contact deleted successfully.");
});
exports.getContacts = catchAsyncFunc(async (req, res, next) => {
  const contacts = await db("contacts")
    // .where("status", "active")
    .orderBy("created_at", "desc")
    .select();

  if (!contacts) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while searching for contacts.",
      500
    );
  }
  return helper.sendSuccess(req, res, { contactsData: contacts }, "success");
});

exports.searchUser = catchAsyncFunc(async (req, res, next) => {
  const {
    id_card_number,
    role,
    phone,
    state,
    city,
    zip,
    country,
    email,
    from_date,
    to_date,
  } = req.body;
  const query = db("users");

  if (id_card_number) {
    query.andWhere("id_card_number", id_card_number);
  }
  if (phone) {
    query.andWhere("phone", phone);
  }
  if (zip) {
    query.andWhere("zip", zip);
  }
  if (role) {
    query.andWhere("role", "like", `%${role}%`);
  }
  if (state) {
    query.andWhere("state", "like", `%${state}%`);
  }
  if (city) {
    query.andWhere("city", "like", `%${city}%`);
  }
  if (email) {
    query.andWhere("email", "like", `%${email}%`);
  }
  if (country) {
    query.andWhere("country", "like", `%${country}%`);
  }
  if (from_date && to_date) {
    query.whereBetween("created_at", [from_date, to_date]);
  }

  const response = await query.select();
  console.log(response);
  return helper.sendSuccess(req, res, { userData: response }, "success");
});
