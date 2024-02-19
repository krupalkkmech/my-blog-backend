// index.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const db = require("./db");
const app = express();
const PORT = 6969;

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cors());

// Define Blog schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    shortContent: {
      type: String,
    },
    contentText: {
      type: String,
    },
    contentHTML: {
      type: String,
    },
    type: {
      type: String,
    },
    keyWords: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

// API routes
app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  const response = {
    code: 200,
    result: blogs,
    message: "Succefull",
  };
  res.json(response);
});

app.post("/blogs", async (req, res) => {
  const { title, contentText, contentHTML, type, keyWords } = req.body;
  const shortContent =
    contentText?.replace("\n", " ").length > 200
      ? contentText?.replace("\n", " ").substr(0, 150) + "..."
      : contentText?.replace("\n", " ");
  const newBlog = new Blog({
    title,
    shortContent,
    contentText,
    contentHTML,
    type,
    keyWords,
  });
  await newBlog.save();
  const response = {
    code: 200,
    result: newBlog,
    message: "Succefull",
  };
  res.status(201).json(response);
});

app.get("/blogs/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404).send("Blog not found");
  } else {
    const response = {
      code: 200,
      result: blog,
      message: "Succefull",
    };
    res.json(response);
  }
});

app.put("/blogs/:id", async (req, res) => {
  const { title, content } = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );
  if (!updatedBlog) {
    res.status(404).send("Blog not found");
  } else {
    res.json(updatedBlog);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
