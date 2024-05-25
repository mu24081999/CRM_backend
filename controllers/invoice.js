const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const fs = require("fs");
const moment = require("moment");
const nodeMailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

function sendEmailTemplate() {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      host: "smpt.gmail.com",
      port: "465",
      user: config.EMAIL_FROM_ACC,
      pass: config.EMAIL_FROM_ACC_PASS,
    },
  });
  // Configure the Handlebars options
  const handlebarOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.resolve(__dirname, "views"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "views"),
    extName: ".hbs",
  };
  transporter.use("compile", hbs(handlebarOptions));
  const mailOptions = {
    from: config.EMAIL_FROM_ACC,
    to: "umarrajpoot274@gmail.com",
    subject: "Test Email",
    template: "email", // Name of the template file
    context: {
      name: "John Doe", // Replace {{name}} with this value
    },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
}
exports.getInvoices = catchAssyncFunc(async function (req, res, next) {
  const invoices = await db("invoices").select();
  return helper.sendSuccess(
    req,
    res,
    {
      invoicesData: invoices,
    },
    "success"
  );
});
exports.readInvoice = catchAssyncFunc(async function (req, res, next) {
  const { invoice_id } = req.params;
  const invoice = await db("invoices").where("id", invoice_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      invoiceData: invoice,
    },
    "success"
  );
});
exports.deleteInvoice = catchAssyncFunc(async function (req, res, next) {
  const { invoice_id } = req.params;
  const is_deleted = await db("invoices").where("id", invoice_id).update({
    activity: "blocked",
  });
  return helper.sendSuccess(req, res, {}, "Invoice deleted successfully.");
});
exports.updateActivity = catchAssyncFunc(async function (req, res, next) {
  const { invoice_id } = req.params;
  const { activity } = req.body;
  const is_deleted = await db("invoices").where("id", invoice_id).update({
    activity: activity,
  });
  return helper.sendSuccess(req, res, {}, "Invoice updated successfully.");
});
exports.addInvoice = catchAssyncFunc(async function (req, res, next) {
  // const {
  //   invoice_details,
  //   user_id,
  //   user_name,
  //   user_image,
  //   title,
  //   conditions,
  //   bill_details,
  //   business_info,
  //   shipping_info,
  //   invoice_items,
  //   subtotal,
  //   discount,
  //   extra_discount_percentage,
  //   discount_total,
  //   total,
  //   note_to_client,
  //   from_name,
  //   from_label,
  //   personal_memo,
  //   status,
  //   activity,
  // } = req.body;
  // let is_logo_added;
  // let logo_url;
  // console.log("add post", req.body);
  // console.log("add post", req.files);
  // if (req.files) {
  //   is_logo_added = await new Promise(async (resolve, reject) => {
  //     const { logo } = req.files;
  //     const { name, mimetype, tempFilePath } = logo;
  //     const [fileData] = await storage
  //       .bucket("crm-justcall")
  //       .upload(tempFilePath, {
  //         // Specify the destination file name in GCS (optional)
  //         destination: "invoices/" + user_name + "/logos/" + name,
  //         // Set ACL to public-read
  //         predefinedAcl: "publicRead",
  //       });
  //     logo_url = fileData?.publicUrl();
  //     resolve(true);
  //     // fs.readFile(tempFilePath, async (err, data) => {
  //     //   if (err) {
  //     //     console.error("Error reading file:", err);
  //     //     return res.status(500).send("Internal Server Error");
  //     //   }
  //     //   const params = {
  //     //     Bucket: config.S3_BUCKET,
  //     //     Key: "invoices/" + user_name + "/logos/" + name,
  //     //     Body: data,
  //     //     ContentType: mimetype,
  //     //   };
  //     //   s3.upload(params, {}, async (err, data) => {
  //     //     if (err) {
  //     //       console.error(err);
  //     //       reject(new Error("Error Uploading File: " + err));
  //     //     } else {
  //     //       console.log("File uploaded successfully:", data);
  //     //       logo_url = data?.Location;
  //     //       resolve(true);
  //     //     }
  //     //   });
  //     // });
  //   });
  // }
  // const post_data = {
  //   user_id,
  //   user_image,
  //   user_name,
  //   title,
  //   conditions,
  //   bill_details: JSON.parse(bill_details),
  //   business_info: JSON.parse(business_info),
  //   shipping_info: JSON.parse(shipping_info),
  //   invoice_details: JSON.parse(invoice_details),
  //   invoice_items: JSON.parse(invoice_items),
  //   subtotal,
  //   discount,
  //   extra_discount_percentage,
  //   discount_total: discount_total !== undefined ? discount_total : 0,
  //   total,
  //   note_to_client,
  //   from_name,
  //   from_label,
  //   personal_memo,
  //   logo: req.files && is_logo_added ? logo_url : null,
  //   status,
  //   activity,
  // };
  // const is_added = await db("invoices").insert(post_data);
  // if (!is_added) {
  //   return helper.sendError(req, res, "Error adding invoice", 500);
  // }
  await sendEmailTemplate();

  return helper.sendSuccess(req, res, {}, "invoice added successfully");
});

exports.updateInvoiceRec = catchAssyncFunc(async function (req, res, next) {
  const { invoice_id } = req.params;
  const {
    invoice_details,
    user_id,
    user_name,
    user_image,
    title,
    conditions,
    bill_details,
    business_info,
    shipping_info,
    invoice_items,
    subtotal,
    discount,
    extra_discount_percentage,
    discount_total,
    total,
    note_to_client,
    from_name,
    from_label,
    personal_memo,
    status,
    activity,
  } = req.body;
  let is_logo_added;
  let logo_url;
  console.log(req.body);
  console.log(req.files);
  if (req.files) {
    is_logo_added = await new Promise((resolve, reject) => {
      const { logo } = req.files;
      const { name, mimetype, tempFilePath } = logo;
      fs.readFile(tempFilePath, async (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return res.status(500).send("Internal Server Error");
        }
        const params = {
          Bucket: config.S3_BUCKET,
          Key: "invoices/" + user_name + "/logos/" + name,
          Body: data,
          ContentType: mimetype,
        };
        s3.upload(params, {}, async (err, data) => {
          if (err) {
            console.error(err);
            reject(new Error("Error Uploading File: " + err));
          } else {
            console.log("File uploaded successfully:", data);
            logo_url = data?.Location;
            resolve(true);
          }
        });
      });
    });
  }
  const post_data = {
    user_id,
    user_image,
    user_name,
    title,
    conditions,
    bill_details: bill_details,
    business_info: business_info,
    shipping_info: shipping_info,
    invoice_details: invoice_details,
    invoice_items: invoice_items,
    subtotal,
    discount,
    extra_discount_percentage,
    discount_total,
    total,
    note_to_client,
    from_name,
    from_label,
    personal_memo,
    logo: req.files && is_logo_added ? logo_url : null,
    status,
    activity,
  };
  const is_updated = await db("invoices")
    .where("id", invoice_id)
    .update(post_data);
  if (!is_updated) {
    return helper.sendError(req, res, "Error updating invoice", 500);
  }
  return helper.sendSuccess(req, res, {}, "invoice updated successfully");
});
