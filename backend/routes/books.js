const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// ➕ Create book
router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Bulk insertion
// ➕ Bulk Insert Books
router.post("/bulk", async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: "Request body must be an array" });
    }

    const books = await Book.insertMany(req.body);
    res.status(201).json({
      message: `${books.length} books inserted successfully`,
      data: books
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📚 Get all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// 🗂 Get books by category
router.get("/category/:category", async (req, res) => {
  const books = await Book.find({ category: req.params.category });
  res.json(books);
});

// 📅 Get books after 2015
router.get("/after/2015", async (req, res) => {
  const books = await Book.find({ publishedYear: { $gt: 2015 } });
  res.json(books);
});

// ♻ Update copies with validation
router.patch("/:id/copies", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    const newStock = book.availableCopies + req.body.change;
    if (newStock < 0)
      return res.status(400).json({ error: "Negative stock not allowed" });

    book.availableCopies = newStock;
    await book.save();
    res.json(book);
  } catch {
    res.status(400).json({ error: "Invalid update" });
  }
});

// 🏷 Change category
router.patch("/:id/category", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { category: req.body.category },
      { new: true }
    );

    if (!book) return res.status(404).json({ error: "Book not found" });

    res.json(book);
  } catch {
    res.status(400).json({ error: "Invalid category update" });
  }
});

// 🗑 Delete if copies = 0
router.delete("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ error: "Book not found" });

  if (book.availableCopies !== 0)
    return res.status(400).json({
      error: "Cannot delete — copies still available"
    });

  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book removed" });
});

module.exports = router;
