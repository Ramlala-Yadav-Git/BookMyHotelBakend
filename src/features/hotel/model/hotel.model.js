const HotelSchema = (sequelize, DataTypes) => {
  const Hotel = sequelize.define("hotel", {
    name: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    review: { type: DataTypes.INTEGER, allowNull: false },
    hotelId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
  });
  return Hotel;
};

module.exports = HotelSchema;
