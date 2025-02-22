const { required } = require("joi");
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the title of the book."],
      maxLength: 370,
    },
    author: {
      type: String,
      required: [true, "Please provide the author of the book."],
      maxLength: 250,
    },
    category: {
      type: String,
      required: [true, "Please provide the category of the book."],
      maxLength: 250,
    },
    status: {
      type: String,
      enum: ["Want to Read", "Reading", "Completed"],
      default: "Want to Read",
    },
    currentPage: {
      type: Number,
      min: 0,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
