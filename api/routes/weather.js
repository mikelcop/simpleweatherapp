var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

router.post("/city", function(req, res, next) {
  console.log(req.body);
  let { city } = req.body;
  const apiUrl = `https://www.metaweather.com/api/location/search/?query=${city}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      res.redirect("/error");
    });
});

router.post("/location", function(req, res, next) {
  let { woeid } = req.body;
  console.log(req.body);
  const apiUrl = `https://www.metaweather.com/api/location/${woeid}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      res.redirect("/error");
    });
});

module.exports = router;
