const client = require("./connect.js");
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // set content type header
  res.setHeader("Content-Type", "text/html");

  // read index.html file and send response
  fs.readFile("./index.html", (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("Error reading index.html file");
    } else {
      res.statusCode = 200;
      res.end(data);
    }
  });
});

const PORT = 3300;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/cities", (req, res) => {
  const cities = [
    "London",
    "Birmingham",
    "Manchester",
    "Paris",
    "Belfast",
    "Melbourne",
    "Florence",
    "Essex",
    "Bristol",
    "Coventry",
    "Oxford",
    "Cambridge",
  ];
  const randomIndex = Math.floor(Math.random() * cities.length);
  const randomCity = cities[randomIndex];
  res.send(randomCity);
});

app.get("/adjectives", (req, res) => {
  const adjectives = [
    "beautiful",
    "fun",
    "vibrant",
    "exciting",
    "wonderful",
    "remarkable",
    "cultural",
    "diverse",
    "rural",
    "quaint",
    "friendly",
    "picturesque",
  ];
  const randomIndex = Math.floor(Math.random() * adjectives.length);
  const randomAdjective = adjectives[randomIndex];
  res.send(randomAdjective);
});

app.get("/sentence", (req, res) => {
  const adjectivesEndpoint = "http://localhost:3300/adjectives";
  const citiesEndpoint = "http://localhost:3300/cities";
  const getAdjective = axios.get(adjectivesEndpoint);
  const getCity = axios.get(citiesEndpoint);
  Promise.all([getAdjective, getCity])
    .then((results) => {
      const adjective = results[0].data;
      const city = results[1].data;
      const sentence = `The ${adjective} city of ${city}.`;
      res.send(sentence);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error generating sentence");
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/*  POSTGRES DATABASE 
app.get('/cities', (req, res) => {
    client.query('select * from public.cities', (err, result) => {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})  */
