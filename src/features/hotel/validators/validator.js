const error = require("../../../utils/errorUtil");
const Hotel = require("../model/hotel.model");

const FACILITIES_LIST = ["SWIMMING_POOL", "WIFI", "CANCELLATION", "BREAKFAST"];

const validateCreate = async (body) => {
  const { name, city, rooms, rentPerDay, facilites } = body;
  validateFacilities(facilites);
  if (!name || !city || !rooms || rentPerDay)
    error(422, "One or more mandatory keys are missing");
};

const validateUpdate = async (body) => {
  const { id, facilites } = body;
  validateFacilities(facilites);
  const hotel = Hotel.findOne({ _id: id }).lean().exec();
  if (!hotel) error(400, "Invalid hotel id");
};

const validateFacilities = (facilites = []) => {
  facilites.forEach((item) => {
    if (!FACILITIES_LIST.contains(item))
      error(422, "One or more facilities key are invalid");
  });
};

module.exports = { validateCreate, validateUpdate };
