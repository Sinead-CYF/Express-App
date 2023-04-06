const axios = require("axios");
const cors = require("cors");
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
app.use(cors());

app.use(express.static("public"));

const PORT = process.env.PORT || 3300;
const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_URL
    : `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

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

app.get("/cities", (req, res) => {
  const randomIndex = Math.floor(Math.random() * cities.length);
  const randomCity = cities[randomIndex];
  res.send(randomCity);
});

app.get("/adjectives", (req, res) => {
  const randomIndex = Math.floor(Math.random() * adjectives.length);
  const randomAdjective = adjectives[randomIndex];
  res.send(randomAdjective);
});

app.get("/sentence", async (req, res) => {
  try {
    const adjectiveEndpoint = `${baseUrl}/adjectives`;
    const cityEndpoint = `${baseUrl}/cities`;

    const [adjectiveResponse, cityResponse] = await Promise.all([
      axios.get(adjectiveEndpoint),
      axios.get(cityEndpoint),
    ]);

    const adjective = adjectiveResponse.data;
    const city = cityResponse.data;
    const sentence = `The ${adjective} city of ${city}.`;
    res.send(sentence);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating sentence");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
