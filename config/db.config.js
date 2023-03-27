const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://127.0.0.1:27017/carDB';
const MongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
let mongoose = require('mongoose');

const state = {
    db:null
};
const connect = (cb) => {
  if (state.db) {
    cb();
  } else {
    mongoose.set('strictQuery', true);
    mongoose.connect(url, MongoOptions).then(
      (connectedInstance) => {
        state.db = connectedInstance; 
        console.log('MongoDB connected', url);
        cb();
      },
      (err) => {
        console.log('MongoDB connection error', err);
      }
    );
  }
};
const getPrimarykey=(_id)=>{
    return ObjectId(_id);
}
const getDB=()=>{
    return state.db;
}

module.exports = { getDB, connect, getPrimarykey}