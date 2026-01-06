const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Use env variable in cloud, fallback locally
const MONGO_URI = process.env.MONGO_URI ||
  "mongodb+srv://library_user:library_user@librarymanagement.ltlz7cq.mongodb.net/libraryDB";

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas 🚀"))
  .catch(err => console.error("DB Error:", err));

app.use("/api/books", require("./routes/books"));

// IMPORTANT: Render assigns the port dynamically
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
