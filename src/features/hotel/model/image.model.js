const ImageSchema = (sequelize, DataTypes) => {
  const Image = sequelize.define("image", {
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    hotelId: { type: DataTypes.INTEGER, allowNull: false },
  });
  return Image;
};

module.exports = ImageSchema;
