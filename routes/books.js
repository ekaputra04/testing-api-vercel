const router = require("express").Router();
const booksController = require("../controllers/booksController");

router.get("/", booksController.getAllBooks);
router.get("/:id", booksController.getBook);
router.post("/", booksController.addBooks);
router.put("/:id", booksController.editBooks);
router.delete("/:id", booksController.deleteBooks);

module.exports = router;
