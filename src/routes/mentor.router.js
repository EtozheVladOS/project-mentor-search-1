const { Router } = require('express');
const Ments = require('../db/models/ment.model');

const router = Router();

router.get('/:id', async (req, res) => {
  let sessionTrue = res.locals.newId;
  try {
    const { id } = req.params;
    const mentor = await Ments.findById(id).populate('tags');
    res.render('mentor', { ments: mentor, sessionTrue });
  } catch (error) {
    return res.redirect('/');
  }
});

module.exports = router;
