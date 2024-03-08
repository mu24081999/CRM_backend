const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const fs = require("fs");
const moment = require("moment");

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
    status: "blocked",
  });
  return helper.sendSuccess(req, res, {}, "Invoice deleted successfully.");
});
exports.updateStatus = catchAssyncFunc(async function (req, res, next) {
  const { invoice_id } = req.params;
  const { status } = req.body;
  const is_deleted = await db("invoices").where("id", invoice_id).update({
    status: status,
  });
  return helper.sendSuccess(req, res, {}, "Invoice updated successfully.");
});
exports.addInvoice = catchAssyncFunc(async function (req, res, next) {
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
    bill_details: JSON.parse(bill_details),
    business_info: JSON.parse(business_info),
    shipping_info: JSON.parse(shipping_info),
    invoice_details: JSON.parse(invoice_details),
    invoice_items: JSON.parse(invoice_items),
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
  const is_added = await db("invoices").insert(post_data);
  if (!is_added) {
    return helper.sendError(req, res, "Error adding invoice", 500);
  }
  return helper.sendSuccess(req, res, {}, "invoice added successfully");
});

// exports.updateBoard = catchAssyncFunc(async function (req, res, next) {
//   const { board_id } = req.params;
//   const { name, visibility, avatar_text, avatar_color, team_members } =
//     req.body;
//   if (req.files) {
//     const { image } = req.files;
//     const { name, mimetype, tempFilePath } = image;
//     fs.readFile(tempFilePath, async (err, data) => {
//       if (err) {
//         console.error("Error reading file:", err);
//         return res.status(500).send("Internal Server Error");
//       }
//       const params = {
//         Bucket: config.S3_BUCKET,
//         Key: name,
//         Body: data,
//         ContentType: mimetype,
//       };
//       const is_added = await new Promise((resolve, reject) => {
//         s3.upload(params, {}, async (err, data) => {
//           if (err) {
//             console.error(err);
//             reject(new Error("Error Uploading File: " + err));
//           } else {
//             console.log("File uploaded successfully:", data);

//             resolve(true);
//           }
//         });
//       });
//     });
//   }
//   const is_record_updated = await db("boards").where("id", board_id).update({
//     name: req.body.name,
//     visibility,
//     avatar_text,
//     avatar_color,
//     team_members,
//     // image: data.Location,
//   });
//   if (!is_record_updated) {
//     return helper.sendError(
//       req,
//       res,
//       "Something went wrong, while creating board.",
//       500
//     );
//   }
//   resolve(true);
//   return helper.sendSuccess(req, res, {}, "Board successfully created.");
// });
