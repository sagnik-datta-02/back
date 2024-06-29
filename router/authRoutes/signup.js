// authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/signup.js');

const router = express.Router();

router.post('/signin', async(req,res) => {
  const {email,password} = req.body;
  try{
    const existingUser = await User.findOne({email});
    if(!existingUser) {
      return res.status(401).json({success : false, message: 'Email Not found'});
    }
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if(!isPassword) {
      return res.status(401).json({success : false, message : "invalid email/password"});
    }
    return res.status(200).json({success : true, message : "successful"});
  }
  catch(error) {
    console.error(error);
    return res.status(500).json({success : false, message : 'Interal Server Error'});
  }
});

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password,username, subscription,overall_score,course,score,coins,level } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword , username, subscription, overall_score,course,score,coins,level});
    await newUser.save();

    res.json({ success: true, message: 'Sign-up successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
