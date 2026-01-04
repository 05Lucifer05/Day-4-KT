const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://library_user:library_user@librarymanagement.ltlz7cq.mongodb.net/?appName=Librarymanagement"
)
.then(() => console.log("Connected to MongoDB Atlas 🚀"))
.catch(err => console.error("DB Error:", err));

app.use("/api/books", require("./routes/books"));

app.listen(5000, () => console.log("Server running on 5000"));
