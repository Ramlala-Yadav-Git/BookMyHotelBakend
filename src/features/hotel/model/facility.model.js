const FacilitySchema = (sequelize, DataTypes) => {
  const Facility = sequelize.define("facility", {
    hotelId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.BOOLEAN, allowNull: false },
    facility: {
      type: DataTypes.ENUM(
        "SWIMMING_POOL",
        "WIFI",
        "CANCELLATION",
        "BREAKFAST"
      ),
      allowNull: false,
    },
  });
  return Facility;
};

module.exports = FacilitySchema;
