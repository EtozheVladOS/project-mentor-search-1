const mongoose = require('mongoose');

const { dbConnectionURL, options } = require('./config');

function connect() {
  mongoose.connect(dbConnectionURL, options, (err) => {
    if (err) console.log('Произошла ошибка ', err);
    console.log('Установлено успешное подключение к Базе Данных!');
  });
}

module.exports = { connect };
