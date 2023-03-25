const mongoose = require("mongoose");

const facilitySchema = mongoose.Schema(
  {
    facility: {
      type: String,
      enum: ["FREE_CANCELLATION", "BREAKFAST", "FREE_WIFI", "SWIMMING_POOL"],
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
