const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res, next) => {
  // DB에 전달받으 req.body를 저장
  console.log('[POST] signup req: ', req.body);
  try {
    const user = new User(req.body);
    const result = await user.save();

    return res.sendStatus(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
