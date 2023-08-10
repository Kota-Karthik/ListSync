const express = require("express");
const User = require("../Models/User");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const bcrypt = require('bcryptjs');

const jwt=require("jsonwebtoken");
const secret="iuecnegcrcekemwbfcnecwhbugjbrcfrcbencriecc";


var salt = bcrypt.genSaltSync(10);
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user != null) {
      return res.status(400).json({
        status: "Fail",
        message: "userName already registered",
      });
    }
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({ username, password: hashedPassword });
    newUser.save();
    return res.status(200).json({ status: `success`, message: newUser });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        status: "Fail",
        message: "userName doesn't exist",
      });
    }
    const loginPassword = bcrypt.compareSync(password, user.password);
    if (!loginPassword) {
      return res.status(400).json({
        status: "Fail",
        message: "invalid password",
      });
    }else{
        jwt.sign({username,id:user._id},secret,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json('ok');
        })
    }
    return res.status(200).json({
      status: "Success",
    });
  })
);

module.exports = router;
