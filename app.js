const express = require('express');
const path = require('path');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const morgan = require('morgan');
const secretKey = require('crypto').randomBytes(64).toString('hex');
const { connect } = require('./src/db/db');
const indexRouter = require('./src/routes/index.router');

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

app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log('Server started on PORT', PORT);
});
