const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.opencagedata.com/geocode/v1/json?q=" +
    address +
    "&key=721ba99a8a4c4f2da1562fd2a8f25c30&limit=1";
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather server", undefined);
    } else if (body.results.length === 0) {
      callback("unknown location!!!", undefined);
    } else {
      const d = body.results[0];
      const data = {
        lng: d.geometry.lng,
        lat: d.geometry.lat,
        formated: d.formated,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
