const error = require("../../../utils/errorUtil");
const db = require("../../../config/sqlConfig");

const validateTransactionRequest = async (userId, roomId, days) => {
  if (!userId || !roomId || !days) error(400, "Invalid request");

  const user = await db.user.findByPk(userId);
  if (!user) error(422, "Invalid userId");

  const room = await db.room.findByPk(roomId);
  if (!room) error(422, "Invalid roomId");

  if (room.status != "AVAILABLE")
    error(422, "Sorry this room is not available");

  if (typeof days !== "number" && (days < 1 || days > 30)) {
    error(422, "Invalid days provided");
  }
};

module.exports = { validateTransactionRequest };
