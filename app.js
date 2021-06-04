/* eslint-disable no-undef */
const express = require("express");
const path = require("path");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const secretKey = require("crypto").randomBytes(64).toString("hex");
const { connect } = require("./src/db/db");
const indexRouter = require("./src/routes/index.router");
const lcRouter = require("./src/routes/lc.router");
// const entriesRouter = require('./routes/entries');
// const indexRouter = require('./src/routes/index.router');
const mentorRouter = require("./src/routes/mentor.router");

const registrRouter = require("./src/routes/registrRouter");
const signInRender = require("./src/routes/signinRouter");
const signOutRouter = require("./src/routes/signOut");

const PORT = 3000;
const app = express();

connect();

app.set("view engine", "hbs");
app.set("cookieName", "userCookie");
app.set("views", path.join(process.env.PWD, "src", "views"));


const sessionParser = sessions({
    name: app.get("cookieName"),
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/MENTORS",
    }),
    cookie: {
        // secure: true,
        httpOnly: true,
        maxAge: 100000000,
    },
});

app.use(sessionParser);

app.use(express.static(path.join(process.env.PWD, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  if (req.session.newId) {
    
    res.locals.newId = req.session.newId;
    console.log("vot ona", res.locals.newId)
    
    // console.log( "req.session.user.id - est!!",req.session.user.id);
      // res.locals.name = req.session.name;
      // res.locals.mainId = req.session.user.id;

  }else
  console.log("nety")
  // console.log("req.session.user.id - nety!",req.session.user.id) 
  return next();
});

app.use("/", indexRouter);
app.use("/mentor", mentorRouter);
app.use("/personalacc", lcRouter);
app.use("/signIn", signInRender);
app.use("/signUp", registrRouter);
app.use("/logout", signOutRouter);



app.listen(PORT, () => {
    console.log("Server started on PORT", PORT);
});
