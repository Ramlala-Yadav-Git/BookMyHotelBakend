const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    description: { type: String, required: false },
    rating: { type: Number, required: true },
    review: { type: Number, required: true },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Hotel", hotelSchema);
