const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const fs = require("fs");
const moment = require("moment");

exports.getPosts = catchAssyncFunc(async function (req, res, next) {
  const posts = await db("posts").select();
  return helper.sendSuccess(
    req,
    res,
    {
      postsData: posts,
    },
    "success"
  );
});
exports.readPost = catchAssyncFunc(async function (req, res, next) {
  const { post_id } = req.params;
  const post = await db("posts").where("id", post_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      postData: post,
    },
    "success"
  );
});
exports.deletePost = catchAssyncFunc(async function (req, res, next) {
  const { post_id } = req.params;
  const post = await db("posts").where("id", post_id).update({
    status: "blocked",
  });
  return helper.sendSuccess(req, res, {}, "Post deleted successfully.");
});
exports.addPost = catchAssyncFunc(async function (req, res, next) {
  const {
    title,
    visibility,
    permalink,
    post_content,
    post_type,
    // preview_image,
    // slider_images,
    tags,
    category,
    publish_date,
    status,
    user_id,
    user_name,
    user_image,
  } = req.body;
  console.log(req.files);
  const slider_images_json = [];
  let preview_image_url;
  let is_preview_added;
  let is_slider_images_added;
  if (req.files) {
    console.log("🚀 ~ req.files:", req.files);
    const { slider_images, preview_image } = req.files;
    if (preview_image) {
      const { tempFilePath, size, mimetype, name } = preview_image;
      const [fileData] = await storage
        .bucket("crm-justcall")
        .upload(tempFilePath, {
          // Specify the destination file name in GCS (optional)
          destination: "posts/previews/" + user_name + "/" + name,
          // Set ACL to public-read
          predefinedAcl: "publicRead",
        });
      preview_image_url = fileData?.publicUrl();
      is_preview_added = true;
      // is_preview_added = await new Promise((resolve, reject) => {
      //   fs.readFile(tempFilePath, async (err, data) => {
      //     if (err) {
      //       console.error("Error reading file:", err);
      //       return helper.sendError(req, res, "Error uploading files.", 500);
      //     }
      //     const params = {
      //       Bucket: config.S3_BUCKET,
      //       Key: "posts/previews/" + user_name + "/" + name,
      //       Body: data,
      //       ContentType: mimetype,
      //     };
      //     s3.upload(params, {}, async (err, data) => {
      //       if (err) {
      //         console.error(err);
      //         reject(new Error("Error Uploading File: " + err));
      //         return helper.sendError(req, res, "Error uploading files.", 500);
      //       } else {
      //         console.log("File uploaded successfully:", data);
      //         resolve(true);
      //         preview_image_url = data.Location;
      //       }
      //     });
      //   });
      // });
    }
    if (slider_images) {
      if (Array.isArray(slider_images)) {
        is_slider_images_added = await Promise.all(
          slider_images.map(async (file) => {
            return new Promise((resolve, reject) => {
              fs.readFile(file.tempFilePath, async (err, data) => {
                if (err) {
                  console.error("Error reading file:", err);
                  reject(new Error("Error reading file: " + err));
                  return helper.sendError(
                    req,
                    res,
                    "Error uploading files.",
                    500
                  );
                }
                const [fileData] = await storage
                  .bucket("crm-justcall")
                  .upload(file.tempFilePath, {
                    // Specify the destination file name in GCS (optional)
                    destination: "posts/sliders/" + user_name + "/" + file.name,
                    // Set ACL to public-read
                    predefinedAcl: "publicRead",
                  });
                slider_images_json.push({
                  image_url: fileData?.publicUrl(),
                });
                is_slider_images_added = true;
                const params = {
                  Bucket: config.S3_BUCKET,
                  Key: "posts/sliders/" + user_name + "/" + file.name,
                  Body: data,
                  ContentType: file.mimetype,
                };
                s3.upload(params, {}, async (err, data) => {
                  if (err) {
                    console.error(err);
                    reject(new Error("Error Uploading File: " + err));
                    return helper.sendError(
                      req,
                      res,
                      "Error uploading files.",
                      500
                    );
                  } else {
                    console.log("File uploaded successfully:", data);
                    slider_images_json.push({
                      image_url: data.Location,
                    });
                    resolve(true);
                  }
                });
              });
            });
          })
        );
      } else {
        const { tempFilePath, size, mimetype, name } = slider_images;
        const [fileData] = await storage
          .bucket("crm-justcall")
          .upload(tempFilePath, {
            // Specify the destination file name in GCS (optional)
            destination: "posts/sliders/" + user_name + "/" + name,
            // Set ACL to public-read
            predefinedAcl: "publicRead",
          });
        slider_images_json.push({
          image_url: fileData?.publicUrl(),
        });
        is_slider_images_added = true;
        // is_slider_images_added = await new Promise((resolve, reject) => {
        //   fs.readFile(tempFilePath, async (err, data) => {
        //     if (err) {
        //       console.error("Error reading file:", err);
        //       return helper.sendError(req, res, "Error uploading files.", 500);
        //     }
        //     const params = {
        //       Bucket: config.S3_BUCKET,
        //       Key: "posts/sliders/" + user_name + "/" + name,
        //       Body: data,
        //       ContentType: mimetype,
        //     };
        //     s3.upload(params, {}, async (err, data) => {
        //       if (err) {
        //         console.error(err);
        //         reject(new Error("Error Uploading File: " + err));
        //       } else {
        //         console.log("File uploaded successfully:", data);
        //         slider_images_json.push({
        //           image_url: data.Location,
        //         });
        //         resolve(true);
        //       }
        //     });
        //   });
        // });
      }
    }
    console.log(slider_images, preview_image);
    if (is_slider_images_added && is_preview_added) {
      const is_record_inserted = await db("posts").insert({
        title,
        visibility,
        permalink,
        post_content,
        post_type,
        preview_image: preview_image_url,
        slider_images: { images: slider_images_json },
        tags: { tags: typeof tags === "string" ? [tags] : tags },
        category,
        publish_date,
        status,
        user_id,
        user_name,
        user_image,
      });
      if (is_record_inserted) {
        return helper.sendSuccess(req, res, {}, "Post added successfully");
      }
    }
  }
});

exports.updatePost = catchAssyncFunc(async function (req, res, next) {
  const { post_id } = req.params;
  const {
    title,
    visibility,
    permalink,
    post_content,
    post_type,
    // preview_image,
    // slider_images,
    tags,
    category,
    publish_date,
    status,
    user_id,
    user_name,
    user_image,
  } = req.body;
  console.log(req.files);
  const slider_images_json = [];
  let preview_image_url;
  let is_preview_added;
  let is_slider_images_added;
  // if (req.files) {
  //   console.log("🚀 ~ req.files:", req.files);
  //   const { slider_images, preview_image } = req.files;
  //   if (preview_image) {
  //     const { tempFilePath, size, mimetype, name } = preview_image;

  //     is_preview_added = await new Promise((resolve, reject) => {
  //       fs.readFile(tempFilePath, async (err, data) => {
  //         if (err) {
  //           console.error("Error reading file:", err);
  //           return helper.sendError(req, res, "Error uploading files.", 500);
  //         }
  //         const params = {
  //           Bucket: config.S3_BUCKET,
  //           Key: "posts/previews/" + user_name + "/" + name,
  //           Body: data,
  //           ContentType: mimetype,
  //         };
  //         s3.upload(params, {}, async (err, data) => {
  //           if (err) {
  //             console.error(err);
  //             reject(new Error("Error Uploading File: " + err));
  //             return helper.sendError(req, res, "Error uploading files.", 500);
  //           } else {
  //             console.log("File uploaded successfully:", data);
  //             resolve(true);
  //             preview_image_url = data.Location;
  //           }
  //         });
  //       });
  //     });
  //   }
  //   if (slider_images && Array.isArray(slider_images)) {
  //     is_slider_images_added = await Promise.all(
  //       slider_images.map(async (file) => {
  //         return new Promise((resolve, reject) => {
  //           fs.readFile(file.tempFilePath, async (err, data) => {
  //             if (err) {
  //               console.error("Error reading file:", err);
  //               reject(new Error("Error reading file: " + err));
  //               return helper.sendError(
  //                 req,
  //                 res,
  //                 "Error uploading files.",
  //                 500
  //               );
  //             }
  //             const params = {
  //               Bucket: config.S3_BUCKET,
  //               Key: "posts/sliders/" + user_name + "/" + file.name,
  //               Body: data,
  //               ContentType: file.mimetype,
  //             };
  //             s3.upload(params, {}, async (err, data) => {
  //               if (err) {
  //                 console.error(err);
  //                 reject(new Error("Error Uploading File: " + err));
  //                 return helper.sendError(
  //                   req,
  //                   res,
  //                   "Error uploading files.",
  //                   500
  //                 );
  //               } else {
  //                 console.log("File uploaded successfully:", data);
  //                 slider_images_json.push({
  //                   image_url: data.Location,
  //                 });
  //                 resolve(true);
  //               }
  //             });
  //           });
  //         });
  //       })
  //     );
  //   } else {
  //     const { tempFilePath, size, type, name } = slider_images;
  //     is_slider_images_added = await new Promise((resolve, reject) => {
  //       fs.readFile(tempFilePath, async (err, data) => {
  //         if (err) {
  //           console.error("Error reading file:", err);
  //           return helper.sendError(req, res, "Error uploading files.", 500);
  //         }
  //         const params = {
  //           Bucket: config.S3_BUCKET,
  //           Key: "posts/sliders/" + user_name + "/" + name,
  //           Body: data,
  //           ContentType: mimetype,
  //         };
  //         s3.upload(params, {}, async (err, data) => {
  //           if (err) {
  //             console.error(err);
  //             reject(new Error("Error Uploading File: " + err));
  //           } else {
  //             console.log("File uploaded successfully:", data);
  //             slider_images_json.push({
  //               image_url: data.Location,
  //             });
  //             resolve(true);
  //           }
  //         });
  //       });
  //     });
  //   }

  // }
  // if (is_slider_images_added && is_preview_added) {
  const is_record_inserted = await db("posts")
    .where("id", post_id)
    .update({
      title,
      visibility,
      permalink,
      post_content,
      post_type,
      // preview_image: preview_image_url && preview_image_url,
      // slider_images: slider_images && { images: slider_images_json },
      tags: tags && { tags: JSON.stringify(tags) },
      category,
      publish_date,
      status,
      user_id,
      user_name,
      user_image,
    });
  if (is_record_inserted) {
    return helper.sendSuccess(req, res, {}, "Post updated successfully");
  }
  // }
});
