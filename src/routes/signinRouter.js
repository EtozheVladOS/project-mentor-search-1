const { Router } = require("express");
const Ments = require("../db/models/ment.model");
const mentRouter = Router();


mentRouter.get('/', (req, res) => {
  res.render('signIn');
})


  mentRouter.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const currentMent = await Ments.findOne({ email, password });
      if (currentMent) {
        req.session.user = {
          id: currentMent._id,
        };
        return res.redirect('/personalacc');
      }
      
    }
    return res.status(418).redirect('/signin');
  });



module.exports = mentRouter;
