const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const valid = require('../helper');

const getAllUsers = async (req, res) => {
    const result = await mongodb.getDb().db('project2').collection('users').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await mongodb.getDb().db('project2').collection('users').findOne({ _id:userId });
    if (result.acknowledged) {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const newUser = async (req, res) => {
  try{ 
    const response = valid.validateUser(req.body);
    if(response.error){
      res.status(422).json(response.error.message);
      return;
    }

    const result = await mongodb.getDb().db('project2').collection('users').insertOne(req.body);
    if (result.acknowledged) {
        res.status(201).json(result);
      } 
    } 
  catch (err) {
      res.status(500).send(err.message);
    }
};

const updateUser = async (req, res) => {
  try{
    const response = valid.validateUser(req.body);
    if(response.error){
      res.status(422).json(response.error.message);
      return;
    }

    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('project2').collection('users').replaceOne({_id: userId}, req.body);
    
    if (result.modifiedCount != 0) {
        res.status(204).send();
      } 
    } catch (err) {
        res.status(500).send(err.message);
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

module.exports = {getAllUsers, getUser, newUser, updateUser, deleteUser};