const mongoose = require("mongoose");

const connect = () => {
  const username = encodeURIComponent(process.env.MONGO_CONNECTION_USERNAME);
  const password = encodeURIComponent(process.env.MONGO_CONNECTION_PASSWORD);
  const clusterName = encodeURIComponent(process.env.MONGO_CLUSTER_NAME);
  const dataBase = encodeURIComponent(process.env.MONGO_DATABASE_NAME);
  const MONGO_URI = `mongodb+srv://${username}:${password}@${clusterName}.mongodb.net/${dataBase}?retryWrites=true&w=majority`;
  return mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect;
