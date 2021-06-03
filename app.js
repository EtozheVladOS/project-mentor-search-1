const express = require('express');
const path = require('path');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const secretKey = require('crypto').randomBytes(64).toString('hex');
const { connect } = require('./src/db/db');
const indexRouter = require('./src/routes/index.router');

//const entriesRouter = require('./routes/entries');

const PORT = 3000;
const app = express();

connect();

app.set('view engine', 'hbs');
app.set('cookieName', 'userCookie');
app.set('views', path.join(process.env.PWD, 'src', 'views'));

const sessionParser = sessions({
  name: app.get('cookieName'),
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/MENTORS',
  }),
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 100000000,
  },
});

app.use(sessionParser);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', indexRouter);
//app.use('/entries', mentorRouter);

// app.use('/entries', entriesRouter);

app.use(sessions({
  secret: secretKey,
  resave: false, // ПЕРЕСОХРАНЯТЬ СЕССИЮ НА СЕРВЕРЕ ЕСЛИ ТРУ
  saveUninitialized: false, // ЕСЛИ ПОЛЬЗОВАТЕЛЬ ПРИШЕЛ НА САЙТ ПОД НЕГО СОЗДАЕТСЯ ПУСТАЯ СЕССИЯ
  cookie: {
    secure: true,
    httpOnly: true,
  },
}));


app.listen(PORT, () => {
  console.log('Server started on PORT', PORT);
});
