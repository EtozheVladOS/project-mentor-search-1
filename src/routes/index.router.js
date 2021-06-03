const { Router } = require('express');
const router = Router();
const MentorModel = require('../db/models/ment.model');
const TagModel = require('../db/models/tag.model');

router.get('/', async (req, res) => {
  const tags = await TagModel.find().limit(8);
  const mentors = await MentorModel.find().sort({ _id: -1 }).limit(6).populate('tags');
  res.render('index', { tags, mentors });
});

module.exports = router;
