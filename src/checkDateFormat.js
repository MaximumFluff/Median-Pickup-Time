// Uses regex to check timestamp format, Adds time zone argument if missing from values passed in URL to make sure correct values are returned from the API

function checkDateFormat(firstDate, secondDate) {
  const regex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/;
  const firstDateTest = regex.test(firstDate);
  const secondDateTest = regex.test(secondDate);
  if (!firstDateTest || !secondDateTest) {
    return false;
  }
  else {
    return [firstDate.charAt(firstDate.length - 1) === 'Z' ? firstDate : `${firstDate}Z`, secondDate.charAt(secondDate.length - 1) === 'Z' ? secondDate : `${secondDate}Z`]
  }
}

module.exports = checkDateFormat;