const { Router } = require('express');
const Ments = require('../db/models/ment.model');

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await Ments.findById(id);
    res.render('mentor', { ments: mentor });
  } catch (error) {
    return res.redirect('/');
  }
});

module.exports = router;
