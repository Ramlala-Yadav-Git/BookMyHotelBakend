const User = require("../user/model/user.model");
const error = require("../utils/errorUtil");

async function auth(req, res, next) {
  const accessToken = req.header("accessToken");
  if (!accessToken) error(401, "Access denied. No access token provided.");

  try {
    const user = await User.findOne({ _id: accessToken });
    if (!user) error(401, "Access denied.");

    if (user.status == "USER") error(403, "User is not authorized");

    next();
  } catch (exception) {
    error(500, "Something went wrong");
  }
}

module.exports = auth;
