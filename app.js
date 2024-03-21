const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Berhasil connect");
  })
  .catch((err) => console.error(err));

console.log("Database Terhubung");

const { getAllBook, addBooks } = require("./controllers/books");

app.get("/books", getAllBook);
app.post("/books", addBooks);

app.listen(8000, () => {
  console.log("Aplikasi Berjalan Di Port 8000");
});

app.get("/", (req, res) => {
  res.send("Server is Running");
});
