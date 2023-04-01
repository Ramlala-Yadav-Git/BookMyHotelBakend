const UserSchema = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    name: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("ADMIN", "ANALYST", "USER"), allowNull: true },
  });
  return User;
};

module.exports = UserSchema;
