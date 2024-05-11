const helper = require("../helper/helper");
const jwt = require("jsonwebtoken");

const IsAuth = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token)
      return res.status(401).json({
        errors: "Please login to get access",
      });

    const decodeToken = jwt.verify(token, config.JWT_SECRET);
    const session = await db("sessions")
      .where("user_id", decodeToken?.user_id)
      .andWhere("token", token)
      .first();
    const user = await db("users")
      .where("id", decodeToken?.user_id)
      .andWhere("status", "active")
      .first();
    if (!session || !user) {
      return helper.sendError(req, res, "User not valid.", 500);
    }

    req.user = user;
    req.userSession = session;
    next();
  } catch (error) {
    return helper.sendError(req, res, error, 500);
  }
};

const authorizedRole = function (roles) {
  return async (req, res, next) => {
    // Get the user role from the JWT token or wherever you've stored it.
    const userRole = req.user.role; // Replace this with how you retrieve the user's role.

    if (!userRole || !roles?.includes(userRole)) {
      return helper.sendError(req, res, "You are not authorized.", 401);
    }

    // If the user has the required role, proceed to the next middleware/route handler.
    next();
  };
};
module.exports = {
  IsAuth,
  authorizedRole,
};
