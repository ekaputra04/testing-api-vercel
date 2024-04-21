const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Berhasil connect ke database");
  } catch (error) {
    console.error("Gagal connect ke database:", error);
    process.exit(1);
  }
}

connectToDatabase();

const {
  getAllBook,
  getBook,
  addBooks,
  editBooks,
  deleteBooks,
} = require("./controllers/books");

app.get("/books", getAllBook);
app.get("/books/:id", getBook);
app.post("/books", addBooks);
app.put("/books/:id", editBooks);
app.delete("/books/:id", deleteBooks);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Aplikasi Berjalan Di Port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server is Running");
});
