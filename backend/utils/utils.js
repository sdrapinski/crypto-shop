function getRandomUniqueNumbers(min, max, howMany = 1, exception = []) {
  var uniqueNumbers = [];

  
  while (uniqueNumbers.length < howMany) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (
      !uniqueNumbers.includes(randomNumber) &&
      !checkNumbers(exception, uniqueNumbers)
    ) {
      uniqueNumbers.push(randomNumber);
    }
  }

  return uniqueNumbers;
}

function checkNumbers(arr = [], arrayCheck = []) {
  for (const item of arr) {
    if (arrayCheck.includes(item)) {
      return true;
    }
  }
  return false;
}

module.exports = {
  getRandomUniqueNumbers,
};
