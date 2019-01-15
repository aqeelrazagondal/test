var express = require("express");
var weather = require("weather-js");
var ip = require("ip");
const iplocation = require("iplocation").default;
const publicIp = require('public-ip');
var geoip = require('geoip-lite');

var app = express();

app.get("/", function (req, res) {
    res.send("Server is running");
});

app.get("/city/:cityname", function (req, res) {
    let city = req.params.cityname;
    // Options:
    // search:     location name or zipcode
    // degreeType: F or C
    weather.find({ search: city, degreeType: "F" }, function (err, result) {
        if (err) res.json(err);

        let response = {
            city: result[0].location["name"],
            temperature: result[0].current["temperature"]
        };
        res.send(response);
    });
});

app.get("/currentLocationTemp", async function (req, res) {
    var ip = await publicIp.v4()
    console.log("Ip address ", ip);
    var geo = geoip.lookup(ip);
    console.log(geo);
    var city = geo["city"];


    weather.find({ search: city, degreeType: "F" }, function (err, result) {
        if (err) res.json(err);

        let response = {
            city: result[0].location["name"],
            temperature: result[0].current["temperature"]
        };
        console.log(result);
        res.json(response);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
