const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const valid = require('../helper');

const getAllBooks = async (req, res) => {
    try {
        const result = await mongodb.getDb().db('project2').collection('books').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(404).json(err.message);
    }
};

const getBook = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const result = await mongodb.getDb().db('project2').collection('books').findOne({ _id:bookId });
      if (result.acknowledged) {
        res.status(200).json(result);
      }
    } catch (err) {
      res.status(404).json(err.message);
    }
  };

const newBook = async (req, res) => {
  try {
    const response = valid.validateBook(req.body);
    if(response.error){
      res.status(422).json(response.error.message);
      return;
    }

    const result = await mongodb.getDb().db('project2').collection('books').insertOne(req.body);
    if (result.acknowledged) {
      res.status(201).json(result);
    } 
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const updateBook = async (req, res) => {
  try{
    const response = valid.validateBook(req.body);
    if(response.error){
      res.status(422).json(response.error.message);
      return;
    }

    const bookId = new ObjectId(req.params.bookId);
    const result = await mongodb.getDb().db('project2').collection('books').replaceOne({_id: bookId}, req.body);
    
    if (result.modifiedCount != 0) {
        res.status(204).send();
      } 
  } catch (err) {
        res.status(500).send(err.message);
  }
}

const deleteBook = async (req, res) => {
  const bookId = new ObjectId(req.params.bookId);
  const result = await mongodb.getDb().db('project2').collection('books').deleteOne({ _id: bookId });
  if (result.deletedCount != 0) {
    res.status(200).send(bookId + ' has been deleted');
  } else {
    res.status(500).send('there was an error');
  }
};

module.exports = { getAllBooks, getBook, newBook, updateBook, deleteBook };