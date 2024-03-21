const Book = require("../models/books");

const getAllBook = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({ data: books });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const addBooks = async (req, res) => {
  try {
    const { judul, penulis, penerbit, tahuntbt, kategori, harga, stok } =
      req.body;

    if (harga <= 0) {
      return res
        .status(400)
        .json({ message: "Harga buku tidak boleh kurang atau sama dengan 0" });
    }

    if (stok < 0) {
      return res
        .status(400)
        .json({ message: "Stok buku tidak boleh kurang dari 0" });
    }

    await Book.create({
      judul,
      penulis,
      penerbit,
      tahuntbt,
      kategori,
      harga,
      stok,
    });

    return res
      .status(200)
      .json({ message: "berhasil menambah buku", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllBook, addBooks };
