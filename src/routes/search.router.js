/* eslint-disable no-case-declarations */
const { Router } = require('express');
const router = Router();
const mongoose = require('mongoose');
const MentorModel = require('../db/models/ment.model');
const TagModel = require('../db/models/tag.model');

router.get('/', async (req, res) => {
  let sessionTrue = res.locals.newId;
  const tags = await TagModel.find().limit(8);
  res.render('search', { tags, sessionTrue });
});

router.post('/', async (req, res) => {
  const { searchParams, textFromSearch, expSearch } = req.body;
  switch (searchParams) {
    case '1':
      try {
        const curTec = await TagModel.findOne({ name: textFromSearch });
        let allMentorsObj;
        if (expSearch) {
          allMentorsObj = await MentorModel.find({ experience: expSearch });
        } else allMentorsObj = await MentorModel.find();
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
      try {
        const allMentorsObj = await MentorModel.find({ name: textFromSearch });
        res.json(allMentorsObj);
        break;
      } catch {
        res.sendStatus(400);
        break;
      }
    default:
      break;
  }
});

module.exports = router;
