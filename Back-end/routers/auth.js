const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require("../middlewares/fetchuser.js");

const JWT_SECRET = 'jwt-secret';

//signUp
router.post('/signup', [
  body('username', 'Enter a valid username').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {

  //check Error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  //Encyption Password
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);


  //Check for old user
  const email = req.body.email;
  const check_email = await User.findOne({ email });

  if (check_email) {
    const olduser = await User.findOne({ email });
    if (olduser) {
      console.log("user already exists");
      return res.json({ data: "exists" });
    }
    else {
      return res.json({ data: "Please give valid password" });
    }
  }

  //New user 
  let doc;
  try {
    let user = new User();
    user.email = req.body.email;
    user.password = secPass;
    user.username = req.body.username;
    doc = await user.save();

    //JWT Token 
    const data = {
      user: {
        id: doc._id,
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken });
  }
  catch (e) {
    res.status(500).send("Internal Server Error");
  }
})

//Login 

router.post("/Login", [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {


  //Validations
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: "Please try to Login with correct credentials" });
  }


  const { email, password } = req.body;

  try {
    //User already logged in or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to Login with correct credentials" });
    }

    //Password Check
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Please try to Login with correct credentials" });
    }

    //jwt validation
    const data = {
      user: {
        id: user._id,
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken });

  }
  catch (e) {
    res.status(500).send("Internal Server Error");
  }

})

// ROUTE 3: GET USER DETAILS USING : POST
router.post("/getuser", fetchuser, async (req, res) => {
  try {

    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  }
  catch (error) {
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;
