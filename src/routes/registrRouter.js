const { Router } = require("express");
//const { route } = require('../app');
const Ments = require("../db/models/ment.model");

const mentRouter = Router();
// const bcrypt = require("bcrypt");
// // ПАКЕТ ДЛЯ СОЗДАНИЯ ПАРОЛЯ
// const saltRound = 10; // ПО СТАНДАРТУ (подключения)


mentRouter.get("/", (req, res) => {
  res.render("signUp");
});

mentRouter.post("/", async (req, res) => {
  
  const { name, email, password } = req.body;
  if (name && email && password) {
    const newMent = await Ments.create({ name, email, password });
     if (newMent){
      req.session.user = {id: newMent._id}
      return res.redirect('/personalacc')
    }

 }
  return res.status(418).redirect('/signUp')
});



module.exports = mentRouter;
