const catchAsyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");

exports.getUserNotifications = catchAsyncFunc(async (req, res, next) => {
  const { user_id } = req.params;
  const notifications = await db("notifications")
    .where("user_id", user_id)
    .orderBy("created_at", "desc")
    .select()
    .limit(20);
  return helper.sendSuccess(
    req,
    res,
    { notificationsData: notifications },
    "success"
  );
});
