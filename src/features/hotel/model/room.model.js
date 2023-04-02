const RoomSchema = (sequelize, DataTypes) => {
  const Room = sequelize.define("room", {
    price: { type: DataTypes.INTEGER, allowNull: false },
    hotelId: { type: DataTypes.INTEGER, allowNull: false },
    beds: { type: DataTypes.INTEGER, allowNull: false },
    discount: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM("AVAILABLE", "NOT_AVAILABLE", "BOOKED"),
      allowNull: false,
    },
  });
  return Room;
};

module.exports = RoomSchema;
