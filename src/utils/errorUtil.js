const error = (code, message) => {
  throw new Error(message, { statusCode: code });
};
module.exports = error;
