const mongoose = require("mongoose");
const ROOM_STATUS_LIST = require("../../../constants/roomStatus");

const roomSchema = mongoose.Schema(
  {
    rentPerDay: { type: Number, required: true },
    beds: { type: Number, required: true },
    status: {
      type: String,
      enum: ROOM_STATUS_LIST,
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

module.exports = mongoose.model("Room", roomSchema);
