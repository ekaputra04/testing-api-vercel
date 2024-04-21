const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
  },
  penulis: {
    type: String,
    required: true,
  },
  penerbit: {
    type: String,
    required: true,
  },
  tahuntbt: {
    type: Number,
    required: true,
  },
  kategori: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  stok: {
    type: Number,
    required: true,
  },
  jmlbeli: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Book", bookSchema);
