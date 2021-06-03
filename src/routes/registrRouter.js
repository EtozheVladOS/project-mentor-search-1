const { Router } = require('express');
const Ments = require('../db/models/ment.model');

const mentRouter = Router();

mentRouter.get('/', (req, res) => {
  res.render('signUp');
});

mentRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    const newMent = await Ments.create({ name, email, password });
    if (newMent) {
      req.session.user = { id: newMent._id };
      return res.redirect('/personalacc');
    }
  }
  return res.status(418).redirect('/signUp');
});

module.exports = mentRouter;
