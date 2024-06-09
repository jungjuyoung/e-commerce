const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res, next) => {
  // DB에 전달받은 req.body를 저장
  console.log('[POST] signup req: ', req.body);
  try {
    const user = new User(req.body);
    const result = await user.save();

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/singIn', async (req, res, next) => {
  // DB에 전달받은 req.body를 저장
  console.log('[POST] login req: ', req.body);
  try {
    // 존재하는 유저인지 확인
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json('이메일가 없습니다');
    }

    // 비밀번호가 올바른 것인지 확인
    const isMatchedPassword = await user.comparePassword(req.body.password);
    if (!isMatchedPassword) {
      return res.status(400).json('비밀번호가 없습니다');
    }

    const payload = {
      userId: user._id.toHexString()
    };

    // Token을 생성
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    return res.status(200).json({ user, accessToken });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
