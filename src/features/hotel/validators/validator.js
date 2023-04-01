const error = require("../../../utils/errorUtil");
const db = require("../../../config/sqlConfig");

const FACILITIES_LIST = ["SWIMMING_POOL", "WIFI", "CANCELLATION", "BREAKFAST"];

const validateGet = async (id) => {
  if (id) error(400, "Invaid request");
  const hotel = await db.hotel.findByPK(id);
  if (!hotel) error(400, "Invalid hotel id");
};

const validateCreate = async (body, accessToken) => {
  await validateAccess(accessToken);
  const { name, city, rooms, rentPerDay, facilites } = body;
  validateFacilities(facilites);
  if (!name || !city || !rooms || rentPerDay)
    error(422, "One or more mandatory keys are missing");
};

const validateUpdate = async (body, accessToken) => {
  await validateAccess(accessToken);
  const { id, facilites } = body;
  validateFacilities(facilites);
  const hotel = await db.hotel.findByPK(id);
  if (!hotel) error(400, "Invalid hotel id");
};

const validateFacilities = (facilites = []) => {
  facilites.forEach((item) => {
    if (!FACILITIES_LIST.contains(item))
      error(422, "One or more facilities key are invalid");
  });
};

const validateAccess = async (id) => {
  const user = await db.user.findByPK(id);
  if (user && !["ADMIN", "ANALYST"].contains(user.role)) {
    error(403, "Not authorised to add/edit hotel");
  }
};

module.exports = { validateCreate, validateUpdate, validateGet };
