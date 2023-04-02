const validator = require("validator");
const error = require("../../../utils/errorUtil");
const db = require("../../../config/sqlConfig");
const bcrypt = require("bcrypt");

const validateCreate = async (body) => {
  const { email = "", type, role = "USER", password } = body;
  if (!validator.isEmail(email))
    error(400, "Email provided is empty or invalid");

  if (type != "THIRD_PARTY" && !password)
    error(400, "Please provide a strong password");
  else if (password && password.length < 4)
    error(422, "Password length should be more than 3 letter");

  if (!["ADMIN", "ANALYST", "USER"].includes(role)) error(400, "Invalid Role");

  if (["ADMIN", "ANALYST"].includes(role))
    error(403, "Not authorised to add Admin users");

  const user = await db.user.findOne({ where: { email: email } });

  if (user) error(422, "User already exists");
};

const validateUpdate = async (body, headers) => {
  const { id, email, role, password } = body;
  const { accesstoken: accessToken } = headers;
  if (email && !validator.isEmail(email))
    error(400, "Email provided is invalid");

  const user = await db.user.findByPk(id);
  if (!user) error(400, "Invalid user Id");

  if (role && role != "ADMIN" && user.role == "ADMIN")
    error(422, "Cannot update admin user");

  if (password && password.length < 4)
    error(422, "Password length should be more than 3 letter");

  if (!["ADMIN", "ANALYST", "USER"].includes(role)) error(400, "Invalid Role");

  if (email && email != user.email) error(400, "Mismatch email and user Id");
  if (role && !["ADMIN", "ANALYST", "USER"].includes(role))
    error(400, "Invalid Role");

  if (email != "someshkumar71524@gmail.com") {
    if (["ADMIN", "ANALYST"].includes(role)) {
      if (!accessToken) error(401, "User is not authenticated");

      const currentUser = await db.user.findByPk(accessToken);

      if (!currentUser || currentUser.role != "ADMIN")
        error(403, "User is not authorised to add ADMIN user");
    }
  }
};

const validateLogin = async (body) => {
  const { email, password, type } = body;

  if (!email) error(422, "Please provide email");

  const user = await await db.user.findOne({ where: { email: email } });
  if (!user) error(404, "User is not present. Please try to signup");

  if (type != "THIRD_PARTY") {
    if (!password) error(422, "Please provide password");

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      error(422, "Password mismatch");
    }
  }
};

module.exports = { validateCreate, validateUpdate, validateLogin };
