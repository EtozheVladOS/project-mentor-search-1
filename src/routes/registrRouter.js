const { Router } = require('express');
const Ments = require('../db/models/ment.model');
const mentRouter = Router();

mentRouter.get('/', (req, res) => {
  res.render('signUp');
});

mentRouter.post('/', async (req, res) => {
  if (req.body.mentOrNot === '1') {
    const { name, email, password } = req.body;
    if (name && email && password) {
      const newMent = await Ments.create({ name, email, password });
      if (newMent) {
        req.session.newId = newMent._id;
        return res.redirect('/');
      }
    }
    return res.status(418).redirect('/signUp');
  }
  if (req.body.mentOrNot === '2') {
    const bodyObj = req.body;
    delete bodyObj.mentOrNot;
    const newMent = await Ments.create(bodyObj);
    if (newMent) {
      req.session.newId = newMent._id;
      return res.redirect('/');
    }
  }
});

module.exports = mentRouter;
