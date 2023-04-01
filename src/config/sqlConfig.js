const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("bookmyhotel", "user", "pass", {
  host: "./dev.sqlite",
  dialect: "sqlite",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../features/user/model/user.model")(sequelize, DataTypes);
db.transaction = require("../features/transaction/model/transaction.model")(
  sequelize,
  DataTypes
);
db.hotel = require("../features/hotel/model/hotel.model")(sequelize, DataTypes);
db.room = require("../features/hotel/model/room.model")(sequelize, DataTypes);
db.image = require("../features/hotel/model/image.model")(sequelize, DataTypes);
db.facility = require("../features/hotel/model/facility.model")(
  sequelize,
  DataTypes
);

module.exports = db;
