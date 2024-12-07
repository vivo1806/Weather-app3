const path = require("path");
const hbs = require("hbs");
const express = require("express");
const geocode = require("./util/geocode.js");
const weatherFetch = require("./util/weatherFetch.js");
const app = express();

//defining path for express config
const localDirec = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlerbars engine and path location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);
//setup static dir for server

app.use(express.static(localDirec));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "killer",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "killer",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "killer",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "no address is provided",
    });
  }
  const address = req.query.address;
  geocode(address, (error, { lat, lng, formated } = {}) => {
    if (error) {
      res.send({
        error,
      });
    } else {
      weatherFetch(lat, lng, (error1, data1) => {
        if (error1) {
          res.send({
            error1,
          });
        } else {
          res.send({
            address: req.query.address,
            forecast: data1,
          });
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log("server is running on 3000");
});
