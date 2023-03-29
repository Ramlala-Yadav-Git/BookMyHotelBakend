const mongoose = require("mongoose");
const FACILITIES_LIST = require("../../../constants/facilities");

const facilitySchema = mongoose.Schema(
  {
    facility: {
      type: String,
      enum: FACILITIES_LIST,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Facility", facilitySchema);
