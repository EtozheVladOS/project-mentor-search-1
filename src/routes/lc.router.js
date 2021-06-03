const Ments = require("../db/models/ment.model");
const router = require("express").Router();

router.get("/personalacc", async (req, res) => {
  const mentor =  await Ments.find();
  console.log(mentor[0]);
    res.render("personalacc", { mentor });
});

module.exports = router;
