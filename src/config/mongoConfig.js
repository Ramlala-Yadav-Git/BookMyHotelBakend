const mongoose = require("mongoose");

const connect = () => {
  const username = encodeURIComponent(process.env.MONGO_CONNECTION_USERNAME);
  const password = encodeURIComponent(process.env.MONGO_CONNECTION_PASSWORD);
  const MONGO_URI = `mongodb+srv://${username}:${password}@cluster1.339khvl.mongodb.net/bookMyHotel?retryWrites=true&w=majority`;
  return mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect;
