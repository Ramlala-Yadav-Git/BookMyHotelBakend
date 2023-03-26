const validator = require("validator");
const error = require("../../utils/errorUtil");

const validateCreate = (email = "", role, headers) => {
  if (!validator.isEmail(email)) {
    error("Email provided is empty or invalid", 400);
  }
  if (role == "ADMIN" || role == "ANALYST") {
    error("Not authorised to add Admin users", 403);
  }
};

const validateUpdate = (id, email, role, headers) => {
  error("Updated feature not allowed", 422);
};

module.exports = { validateCreate, validateUpdate };
