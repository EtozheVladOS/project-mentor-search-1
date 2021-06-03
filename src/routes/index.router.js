const Ments = require("../db/models/ment.model");
const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("index");
});

module.exports = router;
 