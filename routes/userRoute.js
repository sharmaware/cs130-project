const express = require('express');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const maxAge = 30 * 24 * 60 * 60;
const createToken = (id) => {
   return jwt.sign({
       id
   }, process.env.TokenSecret, {
       expiresIn: maxAge
   });
}

router.post("/register", async (req, res) => {
   const emailExists = await User.findOne({
       email: req.body.email
   });
   if (emailExists) return res.status(400).send('Already have an account');
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);
   const user = new User({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       email: req.body.email,
       password: hashedPassword
   });
   try {
       const saveUser = await user.save();
       const token = createToken(saveUser._id);
       res.cookie('jwt', token, {
           httpOnly: true,
           maxAge: maxAge
       });
       console.log("Successfully registered");
       res.status(200).send("Successfully registered")
   } catch (err) {
       console.log("Failed to register");
       res.status(400).send(err);
   }
});

router.post("/login", async (req, res) => {
   const user = await User.findOne({
       email: req.body.email
   });
   if (user) {
       const auth = await bcrypt.compare(req.body.password, user.password);
       if (auth) {
           try {
               const token = createToken(user._id);
               res.cookie('jwt', token, {
                   httpOnly: true,
                   maxAge: maxAge
               });
               console.log("Successfully logged in");
               res.status(200).send("Logged in")
           } catch (err) {
               console.log("Failed to login");
               res.status(400).send(err);
           }
       }
       else{
           return res.status(400).send('Incorrect password');
       }
   }
   else{
       return res.status(400).send('No account found');
   }
});

router.post("/logout", async (req, res) => {
   try{
       res.cookie('jwt', '', {
           maxAge: 1
       });
       console.log("Log out");
       res.status(200).send("Logged out");
   } catch (err) {
       console.log("Could not log out")
       res.status(400).send(err);
   }
});

module.exports = router;