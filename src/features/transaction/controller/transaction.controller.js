const express = require("express");
const { validateTransactionRequest } = require("../validators/validator");
const db = require("../../../config/sqlConfig");

const router = express.Router();

router.post("/book", async (req, res, next) => {
  try {
    const { body: { userId, roomId, days } = {} } = req;

    await validateTransactionRequest(userId, roomId, days);

    let transaction = { userId, roomId };
    const startDate = new Date();
    const currentDate = new Date();
    const endDate = currentDate.setDate(currentDate.getDate() + days);
    transaction = { ...transaction, startDate, endDate };

    await db.transaction.create(transaction);

    const room = await db.room.findByPk(roomId);
    const updateRoom = { ...room, status: "BOOKED" };
    await room.update(updateRoom);
    res.status(200).send(room);
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
