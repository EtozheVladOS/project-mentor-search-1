const mongoose = require('mongoose')

const tagSchema = mongoose.Schema({

  name: {
    type: String,
  },
});

module.exports = mongoose.model('Tags', tagSchema);
