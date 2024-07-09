const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const multer = require('multer');
const path = require('path');
const { getBookCollection } = require('../db/db');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload book endpoint with file upload
router.post("/upload-book", upload.single('bookPDF'), async (req, res) => {
  const { bookTitle, authorName, imageURL, category, bookDescription } = req.body;
  const bookPDF = req.file.path; // Path to the uploaded file

  const newBook = {
    bookTitle,
    authorName,
    imageURL,
    category,
    bookDescription,
    bookPDF, // Store the path to the uploaded PDF
  };

  try {
    const bookCollection = await getBookCollection();
    const result = await bookCollection.insertOne(newBook);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to upload book' });
  }
});

// Fetch all books
router.get("/all-books", async (req, res) => {
  const bookCollection = await getBookCollection();
  let query = {};
  if (req.query?.category) {
    query = { category: req.query.category };
  }
  const result = await bookCollection.find(query).toArray();
  res.send(result);
});

// Update book with file upload
router.patch("/book/:id", upload.single('bookPDF'), async (req, res) => {
  const id = req.params.id;
  const { bookTitle, authorName, imageURL, category, bookDescription } = req.body;
  const bookPDF = req.file ? req.file.path : null; // Path to the uploaded file, if any

  const updateBookData = {
    bookTitle,
    authorName,
    imageURL,
    category,
    bookDescription,
    ...(bookPDF && { bookPDF }),
  };

  try {
    const bookCollection = await getBookCollection();
    const filter = { _id: new ObjectId(id) };
    const updatedDoc = {
      $set: { ...updateBookData },
    };
    const options = { upsert: true };
    const result = await bookCollection.updateOne(filter, updatedDoc, options);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to update book' });
  }
});

// Delete book
router.delete("/book/:id", async (req, res) => {
  const id = req.params.id;
  const bookCollection = await getBookCollection();
  const filter = { _id: new ObjectId(id) };
  const result = await bookCollection.deleteOne(filter);
  res.send(result);
});

// Fetch single book by ID
router.get("/book/:id", async (req, res) => {
  const id = req.params.id;
  const bookCollection = await getBookCollection();
  const filter = { _id: new ObjectId(id) };
  const result = await bookCollection.findOne(filter);
  res.send(result);
});

module.exports = router;
