/* eslint-disable no-await-in-loop */
const { findById, findByIdAndUpdate } = require('../db/models/ment.model');
const Ments = require('../db/models/ment.model');
const Tags = require('../db/models/tag.model');
const router = require('express').Router();

router.get('/', async (req, res) => {
  if (res.locals.newId) {
    // console.log("est?????", res.locals.newId);
    const sessionTrue = res.locals.newId;
    const mentor = await Ments.findById(sessionTrue);
    const mentorElit = mentor;
    const allTags = await Tags.find();
    res.render('personalacc', { mentorElit, sessionTrue, allTags });
  } else {
    res.redirect('/signIn');
  }
});

async function add(updateUser, arr) {
  for (let i = 0; i < arr.length; i += 1) {
    const tag = await Tags.findOne({ name: arr[i] });
    await updateUser.tags.push(tag);
    await updateUser.save();
  }
}

router.post('/', async (req, res) => {
  console.log('VOT TUT', req.body);
  const sessionTrue = res.locals.newId;
  const mentor = await Ments.findById(sessionTrue);
  const mentorElit = mentor;
  let arr = req.body.tags;
  // eslint-disable-next-line max-len
  const updateUser = await Ments.findByIdAndUpdate(
    sessionTrue,
    {
      image: req.body.image,
      description: req.body.description,
      experience: req.body.experience,
      price: req.body.price,
      occupation: req.body.occupation,
      city: req.body.city,
      tags: [],
    },
    { new: true },
  );
  await updateUser.save();
  await add(updateUser, req.body.tags);
  await res.redirect('/');
});

router.get('/:id', async (req, res) => {
  let { id } = req.params;
  const newId = id.slice(1);
  await Ments.findByIdAndDelete(newId);
  req.session.destroy((err) => {
    if (err) return res.redirect('/');
    res.clearCookie(req.app.get('cookieName'));
    return res.redirect('/');
  });
  return res.redirect('/');
});
module.exports = router;
