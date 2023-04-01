const express = require("express");
const { validateTransactionRequest } = require("../validators/validator");
const db = require("../../../config/sqlConfig");

const router = express.Router();

router.get("/book", async (req, res, next) => {
  try {
    const { body: { userId, roomId, days } = {} } = req;

    await validateTransactionRequest(userId, roomId, days);

    const transaction = { userId, roomId };
    const currentDate = new Date();
    const startDate = currentDate;
    const endDate = currentDate.setDate(currentDate.getDate() + days);
    transaction = { ...transaction, startDate, endDate };

    const transcationEntry = await db.transaction.create(transaction);

    const room = await db.room.findByPk(id);
    const updateRoom = { ...room, status: "BOOKED" };
    await room.update(updateRoom);

    res.status(200).send(transcationEntry);
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
