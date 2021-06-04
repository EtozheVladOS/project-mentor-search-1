const { Router } = require('express');

const router = Router();
const MentorModel = require('../db/models/ment.model');
const TagModel = require('../db/models/tag.model');

router.get('/', async (req, res) => {
  const tags = await TagModel.find().limit(8);
  const mentors = await MentorModel.find({image: {$exists: true}}).sort({ _id: -1 }).limit(6).populate('tags');
  const sessionTrue = res.locals.newId;
  console.log(sessionTrue);
  console.log(req.session.newId);
  res.render('index', { tags, mentors, sessionTrue });
});

router.get('/tag/:id', async (req, res) => {
  const tagId = req.params.id;
  const tagsq = await TagModel.find().limit(8);
  const allMentorsObj = await MentorModel.find();
  const allMentArr = allMentorsObj.map((el) => {
    if (el.tags.includes(tagId)) {
      return el;
    }
  });
  const resMentors = [];
  // eslint-disable-next-line no-restricted-syntax
  for (el of allMentArr) {
    // eslint-disable-next-line no-undef
    if (el) resMentors.push(el);
  }
  res.render('tag', { tagsq, resMentors });
});

module.exports = router;
