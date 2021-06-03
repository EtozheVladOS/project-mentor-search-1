const Ments = require("../db/models/ment.model");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const mentor =  await Ments.find();
  const mentorElit = mentor[0];

    res.render("personalacc", { mentorElit });
});

module.exports = router;
