const catchAsyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;

exports.addContact = catchAsyncFunc(async (req, res, next) => {
  console.log(req.body);
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
  console.log("🚀 ~ exports.addContact=catchAsyncFunc ~ file:", file);
  const { name, mimetype, data, size } = file;
  let image = undefined;
  if (file) {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: name,
      Body: data,
      ContentType: mimetype,
    };
    const is_added = await new Promise((resolve, reject) => {
      s3.upload(params, {}, (err, data) => {
        if (err) {
          console.error(err);
          reject(new Error("Error Uploading File: " + err));
        } else {
          // console.log("File uploaded successfully:", data);
          image = data.Location;
          resolve(true);
        }
      });
    });
  }

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
    avatar: image !== undefined ? image : null,
  });
  if (!is_record_inserted) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating user.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Contact successfully created.");
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
exports.updateUser = catchAsyncFunc(async (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().optional(),
    phone: Joi.number().integer().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    country: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.number().integer().required(),
    id_card_number: Joi.number().integer().required(),
    role: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return helper.sendError(req, res, error, 403);
  }
  const { user_id } = req.params;
  var image;
  const imageLinks = [];
  var image_to_upload;

  if (req.files !== null && req.files.image !== undefined) {
    image = req.files.image;
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: "Users",
    });

    if (result) {
      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } else {
      return helper.sendError(
        req,
        res,
        "Something went wrong while uploading image.",
        500
      );
    }
    image_to_upload = imageLinks[0].url;
  }
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(value.password, saltRounds);
  console.log(value, image_to_upload, hashedPassword, user_id);
  const is_record_updated = await db("users").where("id", user_id).update({
    firstname: value.firstname,
    lastname: value.lastname,
    phone: value.phone,
    email: value.email,
    password: hashedPassword,
    address: value.address,
    id_card_number: value.id_card_number,
    city: value.city,
    state: value.state,
    zip: value.zip,
    country: value.country,
    role: value.role,
    image: image_to_upload,
  });
  if (!is_record_updated) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while updating user.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "User successfully updated.");
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
