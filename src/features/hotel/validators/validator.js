const error = require("../../../utils/errorUtil");
const db = require("../../../config/sqlConfig");

const FACILITIES_LIST = ["SWIMMING_POOL", "WIFI", "CANCELLATION", "BREAKFAST"];

const validateGet = async (id) => {
  if (!id) error(400, "Invaid request");
  const hotel = await db.hotel.findByPk(id);
  if (!hotel) error(400, "Invalid hotel id");
};

const validateCreate = async (body, accessToken) => {
  await validateAccess(accessToken);
  const { name, city, rooms, price, facilites, discount, url } = body;
  validateFacilities(facilites);
  if (discount && (discount > 100 || discount < 0)) {
    error(422, "Invalid discount amount");
  }
  if (!name || !city || !rooms || !price || !url)
    error(422, "One or more mandatory keys are missing");
};

const validateUpdate = async (body, accessToken) => {
  await validateAccess(accessToken);
  const { id, facilites } = body;
  validateFacilities(facilites);
  const hotel = await db.hotel.findByPk(id);
  if (!hotel) error(400, "Invalid hotel id");
};

const validateFacilities = (facilites = []) => {
  facilites.forEach((item) => {
    if (!FACILITIES_LIST.includes(item))
      error(422, "One or more facilities key are invalid");
  });
};

const validateAccess = async (id) => {
  const user = await db.user.findByPk(id);
  if (!user) {
    error(401, "Not authenticated");
  }
  if (user && !["ADMIN", "ANALYST"].includes(user.role)) {
    error(403, "Not authorised to add/edit hotel");
  }
};

module.exports = { validateCreate, validateUpdate, validateGet, validateAccess };
