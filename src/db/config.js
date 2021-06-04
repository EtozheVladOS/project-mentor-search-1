const mongoose = require('mongoose');
require('dotenv').config();

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};

// const DB_HOST = 'localhost';
// const DB_NAME = 'MENTORS';
// const DB_PORT = 27017;
// const dbConnectionURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const dbConnectionURL = process.env.connectionURL;
module.exports = { dbConnectionURL, options };
