const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
    const result = await mongodb.getDb().db('project2').collection('users').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
};

const newUser = async (req, res) => {
    const result = await mongodb.getDb().db('project2').collection('users').insertOne(req.body);
    if (result.acknowledged) {
        res.status(201).json(result);
      } else {
        res.status(500).send('there was an error');
      }
};

const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('project2').collection('users').replaceOne({_id: userId}, req.body);
    if (result.modifiedCount != 0) {
        res.status(204).send();
      } else {
        res.status(500).send('there was an error');
      }
};

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('project2').collection('users').deleteOne({ _id: userId });
    if (result.deletedCount != 0) {
      res.status(200).send(userId + ' has been deleted');
    } else {
      res.status(500).send('there was an error');
    }
  };

module.exports = {getAllUsers, newUser, updateUser, deleteUser};