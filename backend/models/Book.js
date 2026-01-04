const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  publishedYear: { type: Number, required: true, min: 1000 },
  availableCopies: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model("Book", bookSchema);
