const Ments = require("../db/models/ment.model");
const Tags = require("../db/models/tag.model");
const router = require("express").Router();

router.get('/', async (req, res) => {
  const mentor = await Ments.find();
  const mentorElit = mentor[0];

  res.render('personalacc', { mentorElit });
});

router.post('/', async (req, res) => {
  const mentor = await Ments.find();
  const mentorElit = mentor[0];

  // eslint-disable-next-line max-len
  const updateUser = await Ments.findByIdAndUpdate(
    mentorElit._id,
    {
      image: req.body.image,
      description: req.body.description,
      experience: req.body.experience,
      price: req.body.price,
      occupation: req.body.occupation,
      city: req.body.city,
    },
    { new: true }
  );
  console.log(updateUser);
  let arr = req.body.tags;
  async function add() {
    for (let i = 0; i < arr.length; i++) {
      let tag = await Tags.findOne({ name: arr[i] });
      updateUser.tags.push(tag);
      await updateUser.save();
    }
  }
  add();

  res.redirect("/");
});

module.exports = router;
