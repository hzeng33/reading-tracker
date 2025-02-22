const Book = require("../models/Book");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllBooks = async (req, res) => {
  const books = await Book.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ books, count: books.length });
};

const getBook = async (req, res) => {
  const {
    user: { userId },
    params: { id: bookId },
  } = req;

  const book = await Book.findOne({
    _id: bookId,
    createdBy: userId,
  });
  if (!book) {
    throw new NotFoundError(`No book with id ${bookId} was found.`);
  }
  res.status(StatusCodes.OK).json({ book });
};

const createBook = async (req, res) => {
  const newBook = { ...req.body };
  newBook.createdBy = req.user.userId;
  const book = await Book.create(newBook);
  res.status(StatusCodes.CREATED).json({ book });
};

const updateBook = async (req, res) => {
  const { title, author, category, status, currentPage } = req.body;

  if (
    title === "" ||
    author === "" ||
    category === "" ||
    status === "" ||
    !(currentPage >= 0)
  ) {
    throw new BadRequestError("Fields cannot be empty.");
  }

  const book = await Book.findByIdAndUpdate(
    { _id: req.params.id, createdBy: req.user.userId },
    { title, author, category, status, currentPage },
    { new: true, runValidators: true }
  );
  if (!book) {
    throw new NotFoundError(`No book with id ${bookId} was found.`);
  }
  res.status(StatusCodes.OK).json({ book });
};

const deleteBook = async (req, res) => {
  const {
    user: { userId },
    params: { id: bookId },
  } = req;

  const book = await Book.findOneAndDelete({
    _id: bookId,
    createdBy: userId,
  });
  if (!book) {
    throw new NotFoundError(`No book with id ${bookId} was found.`);
  }
  res.status(StatusCodes.NO_CONTENT).send();
};

module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook };
