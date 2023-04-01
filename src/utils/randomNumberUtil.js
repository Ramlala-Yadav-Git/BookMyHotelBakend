function getRandomNumber(min, max, decimalPlaces) {
  const randomNumber = Math.random() * (max - min) + min;
  return randomNumber.toFixed(decimalPlaces);
}

module.exports = getRandomNumber;
