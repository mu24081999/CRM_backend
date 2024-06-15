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
exports.updateNotification = catchAsyncFunc(async (req, res, next) => {
  const { notification_id } = req.params;
  const { is_read } = req.body;
  const notifications = await db("notifications")
    .where("id", notification_id)
    .update({
      is_read: is_read,
    });
  return helper.sendSuccess(req, res, {}, "Status updated successfully.");
});
