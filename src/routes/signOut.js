const { Router } = require("express");
const mentRouter = Router();

mentRouter.get('/', async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect('/');
    res.clearCookie(req.app.get('cookieName'));
    return res.redirect('/');
  });
});

module.exports = mentRouter;
