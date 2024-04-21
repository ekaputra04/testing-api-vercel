const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Membuat konfigurasi untuk menyimpan kunci API yang valid
const validAPIKeys = new Set(process.env.VALID_API_KEYS.split(","));

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
  getAllBooks,
  getBook,
  addBooks,
  editBooks,
  deleteBooks,
} = require("./controllers/books");

// Middleware untuk memeriksa kunci API
function checkAPIKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || !validAPIKeys.has(apiKey)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

// Menggunakan middleware untuk memeriksa kunci API untuk semua rute /books
app.use("/books", checkAPIKey);

// Routes
app.get("/books", getAllBooks);
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
