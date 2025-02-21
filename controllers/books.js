const getAllBooks = async (req, res) => {
  res.send("get all books");
};

const getBook = async (req, res) => {
  res.send("get an entry of a book");
};

const createBook = async (req, res) => {
  res.json(req.user);
};

const updateBook = async (req, res) => {
  res.send("update an entry of a book");
};

const deleteBook = async (req, res) => {
  res.send("delete an entry of a book");
};

module.exports = { getAllBooks, getBook, createBook, updateBook, deleteBook };
