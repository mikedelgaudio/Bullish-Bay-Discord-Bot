module.exports = function emptyResponse(response) {
  const keys = Object.keys(response);
  for (let key of keys) {
    if (response[key] === 0) {
      return true;
    }
  }
  return false;
};
