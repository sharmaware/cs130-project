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

router.post("/add", async (req, res) => {
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
        console.log("Success");
        res.status(200).send("Success")
    } catch (err) {
        console.log("Failed");
        res.status(400).send(err);
    }
});

router.post("/delete", async (req, res) => {
    try{
        res.cookie('jwt', '', {
            maxAge: 1
        });
        console.log("Deleted");
        res.status(200).send("Success");
    } catch (err) {
        console.log("Could not delete")
        res.status(400).send(err);
    }
});

module.exports = router;