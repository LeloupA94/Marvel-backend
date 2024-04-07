//installer dotenv et le paramettrer
//si signup ou login prevoir uid12 et crypto-js
// penser au salt / hash & token
require("dotenv").config();

const express = require("express");

const cors = require("cors");

const axios = require("axios");

const app = express();

app.use(cors());

app.use(express.json());

//import de mes routes

const userRoutes = require("./routes/user");

app.use(userRoutes);

//utilisation des mes routes

app.get("/", (req, res) => {
  console.log("hey");
  res.status(200).json({ message: "Bienvenue" });
});

app.get("/characters", async (req, res) => {
  try {
    const limit = req.query.limit || `100`;
    const skip = req.query.skip || `0`;
    const title = req.query.title || ``;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&title=${title}&limit=${limit}&skip=${skip}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "catchErorr" });
    console.log(res.status);
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "catchErorr" });
    console.log(res.status);
  }
});

app.get("/comics", async (req, res) => {
  try {
    const limit = req.query.limit || `100`;
    const skip = req.query.skip || `0`;
    const name = req.query.name || ``;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&name=${name}&limit=${limit}&skip=${skip}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "catchErorr" });
    console.log(res.status);
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log("serveur started");
});
