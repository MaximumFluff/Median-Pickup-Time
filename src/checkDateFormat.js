// Adds time zone argument if missing from values passed in URL to make sure correct values are returned from the API

function checkDateFormat(firstDate, secondDate) {
  return [firstDate.charAt(firstDate.length - 1) === 'Z' ? firstDate : `${firstDate}Z`, secondDate.charAt(secondDate.length - 1) === 'Z' ? secondDate : `${secondDate}Z`]
}

module.exports = checkDateFormat;