const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      connectTimeoutMS: 5000, // Atur timeout koneksi
    });
    console.log("Berhasil connect ke database");
  } catch (error) {
    console.error("Gagal connect ke database:", error);
    process.exit(1); // Keluar dari proses jika gagal terhubung ke database
  }
}

connectToDatabase();

const { getAllBook, addBooks } = require("./controllers/books");

app.get("/books", getAllBook);
app.post("/books", addBooks);

const PORT = process.env.PORT || 8000; // Menggunakan port yang disediakan oleh platform hosting atau 8000 jika tidak tersedia

app.listen(PORT, () => {
  console.log(`Aplikasi Berjalan Di Port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server is Running");
});
