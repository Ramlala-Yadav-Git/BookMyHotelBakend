const TransactionSchema = (sequelize, DataTypes) => {
  const transaction = sequelize.define("transaction", {
    startDate: { type: DataTypes.DATE, allowNull: true },
    endDate: { type: DataTypes.DATE, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return transaction;
};

module.exports = TransactionSchema;
