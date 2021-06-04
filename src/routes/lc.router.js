const { findById, findByIdAndUpdate } = require("../db/models/ment.model");
const Ments = require("../db/models/ment.model");
const Tags = require("../db/models/tag.model");
const router = require("express").Router();

router.get("/", async (req, res) => {
  if(res.locals.newId){
    // console.log("est?????", res.locals.newId);
    let sessionTrue = res.locals.newId;
    const mentor = await Ments.findById(sessionTrue);
    const mentorElit = mentor;

    res.render("personalacc", { mentorElit, sessionTrue });
  }
  else {
    res.redirect("/signIn")
  }

});

async function add(updateUser,arr) {
    // console.log("ДЛИНА", updateUser.tags.length);
    
    console.log("arr", arr)
    // console.log(arr.length)
    // console.log("arrr", tags)
     for (let i = 0; i < arr.length; i++) {
        let tag = await Tags.findOne({ name: arr[i] });
        
         await updateUser.tags.push(tag);
        console.log(tag)
        await updateUser.save();
    }
    
}

router.post("/", async (req, res) => {
  console.log("VOT TUT", req.body);
    let sessionTrue = res.locals.newId;
    const mentor = await Ments.findById(sessionTrue);
    const mentorElit = mentor;
    console.log(mentorElit);
    let arr = req.body.tags;
    // console.log("ona tyt est", req.body);
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
    await updateUser.save();
   
    await add(updateUser, req.body.tags);
    console.log("updateUser",updateUser)

     await res.redirect("/");
});

router.get('/:id', async (req, res) => {
  let id = req.params.id;
  let newId = id.slice(1);
  await Ments.findByIdAndDelete(newId);
  req.session.destroy((err) => {
    if (err) return res.redirect('/');
    res.clearCookie(req.app.get('cookieName'));
    return res.redirect('/');
  });
  return res.redirect("/")
  
})
module.exports = router;
