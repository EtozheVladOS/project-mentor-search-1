const { Router } = require('express');
const router = Router();
const MentorModel = require('../db/models/ment.model');
const TagModel = require('../db/models/tag.model');

router.get('/', async (req, res) => {
  const tags = await TagModel.find().limit(6);
  const mentors = await MentorModel.find().limit(6);
  res.render('index', { tags, mentors });
});

module.exports = router;
