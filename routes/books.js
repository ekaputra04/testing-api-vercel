const router = require("express").Router();
const { getAllBooks } = require("../controllers/books");

router.get("/", getAllBooks);

module.exports = router;
