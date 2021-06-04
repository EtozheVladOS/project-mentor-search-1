const { findById, findByIdAndUpdate } = require("../db/models/ment.model");
const Ments = require("../db/models/ment.model");
const Tags = require("../db/models/tag.model");
const router = require("express").Router();

router.get("/", async (req, res) => {
    console.log("est?????", res.locals.newId);
    let sessionTrue = res.locals.newId;
    const mentor = await Ments.findById(sessionTrue);
    const mentorElit = mentor;

    res.render("personalacc", { mentorElit, sessionTrue });
});

router.post("/", async (req, res) => {
    let sessionTrue = res.locals.newId;
    const mentor = await Ments.findById(sessionTrue);
    const mentorElit = mentor;
    console.log("ona tyt est", req.body);
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
        { new: true }
    );
   
    

    async function add() {
        console.log("ДЛИНА", updateUser.tags.length);
        let arr = req.body.tags;
        console.log("arrr", req.body.tags)
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
