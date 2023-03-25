const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
  {
    imageLink: { type: String, required: true },
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

module.exports = mongoose.Schema("Image", imageSchema);
