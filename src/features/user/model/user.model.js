const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true },
<<<<<<< HEAD:src/user/model/user.model.js
    password:{ type: String, required: true },
    role: { type: String, enum: ["ADMIN", "ANALYST", "USER"], required: false },
=======
    role: { type: String, enum: ["ADMIN", "ANALYST", "USER"], required: true },
    password: { type: String, required: false },
>>>>>>> 570ecd6c24e47b9b0f934d903572b9b88a9a7b5b:src/features/user/model/user.model.js
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
