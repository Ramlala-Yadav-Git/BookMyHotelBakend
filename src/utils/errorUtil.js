const error = (code, message) => {
  throw {
    message,
    status: code,
  };
};
module.exports = error;
