/* eslint-disable no-case-declarations */
const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const MentorModel = require('../db/models/ment.model');
const TagModel = require('../db/models/tag.model');

router.get('/sarch', async (req, res) => {
  const tags = await TagModel.find().limit(8);
  res.render('search', { tags });
});

router.post('/', async (req, res) => {
  const { searchParams, textFromSearch } = req.body;
  switch (searchParams) {
    case '1':
      try {
        const curTec = await TagModel.findOne({ name: textFromSearch });
        const allMentorsObj = await MentorModel.find();
        const allMentArr = allMentorsObj.map((el) => {
          if (el.tags.includes(curTec._id)) {
            return el;
          }
        });
        const resMentors = [];
        // eslint-disable-next-line no-restricted-syntax
        for (el of allMentArr) {
          if (el) resMentors.push(el);
        }
        res.json(resMentors);
        break;
      } catch {
        res.sendStatus(400);
        break;
      }
    case '2':
      console.log(2);
      break;
    case '3':
      console.log(3);
      break;
    default:
      break;
  }
});

module.exports = router;
