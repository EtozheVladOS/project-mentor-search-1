const { Router } = require('express');
const Ments = require('../db/models/ment.model');

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const { mentorId } = req.params;
    await Ments.findById(mentorId);
    res.render('mentor');
  } catch (error) {
    return res.redirect('/');
  }
});

module.exports = router;
