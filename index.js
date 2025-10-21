require("dotenv").config();
const express = require("express");
const corsConfig = require('./src/config/corsConfig');
const app = express();
const PORT = process.env.PORT || 3002;
const API_URL = process.env.API_URL;

app.listen(PORT, () => {console.log(`Servidor Backend Titulos y certificados corriendo en: ${API_URL}`);});

app.use(express.json());
app.use(corsConfig);