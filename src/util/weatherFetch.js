const request = require("request");
const weatherFetch = (lat, lng, callback) => {
  const url =
    "http://api.weatherapi.com/v1/current.json?key=4877c6525cc24391ad2232656240309&q=" +
    lat +
    "," +
    lng;

  request({ url, json: true }, (error, { body }) => {
    const data = body.current;
    if (error) {
      callback("unable to connect to weather server!", undefined);
    } else if (body.error) {
      callback("no location found", undefined);
    } else {
      callback(undefined, "temperature is " + data.temp_c);
    }
  });
};

module.exports = weatherFetch;
