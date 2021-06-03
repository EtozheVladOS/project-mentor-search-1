const mongoose = require("mongoose");

const mentSchema = mongoose.Schema({
  name: {
    type: String,
    requried: true,
    min: 3,
  },
  mail: {
    type: String,
    requried: true,
    min: 5,
    unique: true,
  },
  password: {
    type: String,
    requried: true,
    min: 4,
  },
  image: {
    type: String,
    requried: true,
  },
  experience: {
    type: Number,
    requried: true,
  },
  price: {
    type: Number,
    requried: true,
  },
  description: {
    type: String,
    requried: true,
  },
  occupation: {
    type: String,
    requried: true,
  },
  city: {
    type: String,
    requried: true,
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tags' }],
});

module.exports = mongoose.model('Ments', mentSchema);
