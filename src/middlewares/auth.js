const User = require("../features/user/model/user.model");
const error = require("../utils/errorUtil");
const { ObjectId } = require("mongodb");

function isValidMongoid(id) {
  return ObjectId.isValid(id);
}

async function auth(req, res, next) {
  try {
    const accessToken = req.header("accessToken");
    if (!accessToken) error(401, "Access denied. No access token provided.");
    if (!isValidMongoid(accessToken)) error(400, "Token not recognised");
    const user = await User.findOne({ _id: accessToken });
    if (!user) error(400, "Token not recognised");
    if (user.status == "USER") error(403, "User is not authorized");
    next();
  } catch (exception) {
    next(exception);
  }
}

module.exports = auth;
