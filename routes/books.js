const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/books");

router.route("/").post(createBook).get(getAllBooks);
router.route("/:id").get(getBook).patch(updateBook).delete(deleteBook);

module.exports = router;
