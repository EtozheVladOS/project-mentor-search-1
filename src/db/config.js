const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true, // (в новом формате будет формироваться порт) говорим mongoose, что строка подключения будет в новом формате (новый формат должен обязательно содеражт порт)
  useFindAndModify: false, // (методы для монго дб) заставляем методы findOneAndUpdate() и findOneAndRemove() использовать нативный (т.е предоставленный самой mongodb) метод findOneAndUpdate() вместо findAndModify()
  useCreateIndex: true, // (для боле быстрой выборки из базы данных) Заставляем mongoose работать с функцией createIndex() драйвера mongodb вместо ensureIndex(). Так как последний помечен драйвером mongodb, как устаревший
  useUnifiedTopology: true, // (связвно с драйвером) заставляем mongoose использование новый механизм управления подключением драйвера mongodb.
  poolSize: 10, // (кол во подключений) максимальное количество сокетов, которые драйвер MongoDB будет держать открытыми для этого соединения
  bufferMaxEntries: 0, // (чтобы мы ничего не делали, когда дисконект произошёл) говорим mongoose перестать выполнять любые операции с базой данных, после того как произодет отключение от последней.
  // В противном случае mongoose пытается дождаться восстановления соездинения, для завершения  операций
};
const DB_HOST = "localhost";
const DB_NAME = "MENTORS";
const DB_PORT = 27017;
const dbConnectionURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
module.exports = {dbConnectionURL, options}
