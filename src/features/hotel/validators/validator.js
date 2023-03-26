const error = require("../../../utils/errorUtil");
const FACILITIES_LIST = require("../../../constants/facilities");

const Hotel = require("../model/hotel.model");

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
