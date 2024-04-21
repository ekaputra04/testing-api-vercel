const Book = require("../models/books");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({ data: books });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ _id: id });
    return res.status(200).json({ data: book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const addBooks = async (req, res) => {
  try {
    const booksToAdd = req.body.data;

    if (!booksToAdd) {
      return res.status(400).json({ message: "Data buku tidak valid" });
    }

    if (!Array.isArray(booksToAdd)) {
      // Jika hanya satu buku yang dimasukkan, langsung tambahkan tanpa iterasi
      const {
        judul,
        penulis,
        penerbit,
        tahuntbt,
        kategori,
        harga,
        stok,
        jmlbeli,
      } = booksToAdd;

      if (harga <= 0 || stok < 0) {
        return res
          .status(400)
          .json({ message: "Harga atau stok buku tidak valid" });
      }

      await Book.create({
        judul,
        penulis,
        penerbit,
        tahuntbt,
        kategori,
        harga,
        stok,
        jmlbeli,
      });

      return res
        .status(200)
        .json({ message: "Berhasil menambah buku", data: booksToAdd });
    } else if (booksToAdd.length === 0) {
      return res.status(400).json({ message: "Data buku tidak valid" });
    }

    // Jika lebih dari satu buku dimasukkan, lakukan iterasi seperti sebelumnya
    for (let i = 0; i < booksToAdd.length; i++) {
      const { judul, penulis, penerbit, tahuntbt, kategori, harga, stok } =
        booksToAdd[i];

      if (harga <= 0 || stok < 0) {
        return res
          .status(400)
          .json({ message: "Harga atau stok buku tidak valid" });
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
    }

    return res
      .status(200)
      .json({ message: "Berhasil menambah buku", data: booksToAdd });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const editBooks = async (req, res) => {
  try {
    const { judul, penulis, penerbit, tahuntbt, kategori, harga, stok } =
      req.body;

    const { id } = req.params;

    const book = await Book.findOne({ _id: id });

    if (!book) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    book.judul = judul;
    book.penulis = penulis;
    book.penerbit = penerbit;
    book.tahuntbt = tahuntbt;
    book.kategori = kategori;
    book.harga = harga;
    book.stok = stok;

    if (harga <= 0) {
      return res
        .status(500)
        .json({ message: "Harga buku tidak boleh kurang atau sama dengan 0" });
    }

    if (stok < 0) {
      return res
        .status(500)
        .json({ message: "Stok buku tidak boleh kurang dari 0" });
    }

    await book.save();

    return res
      .status(200)
      .json({ message: "Berhasil mengedit buku", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const deleteBooks = async (req, res) => {
  try {
    const { id } = req.params;

    await Book.deleteOne({ _id: id });

    return res
      .status(200)
      .json({ message: "Berhasil menghapus buku", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllBooks, getBook, addBooks, editBooks, deleteBooks };
