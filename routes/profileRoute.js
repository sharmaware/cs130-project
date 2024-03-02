const express = require('express');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Team = require('../models/Team');
const Template = require('../models/Template');

const maxAge = 30 * 24 * 60 * 60;
const createToken = (id) => {
   return jwt.sign({
       id
   }, process.env.TokenSecret, {
       expiresIn: maxAge
   });
}

router.post('/createtemplate', async (req, res) => {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.TokenSecret);
    var userId = decoded.id;
    const templateExists = await Template.findOne({
        userId: userId
    });
    if (templateExists === null){
        console.log("here");
        const template = new Template({
            userId: userId
        });
        try {
            const saveTemplate = await template.save();
            console.log("Successfully created template.");
        } catch (err) {
            console.log("Failed to create template.");
            res.status(400).send(err);
        }
    }
    var array=req.body.workoutArray;
    // console.log(array);
    Template.findOneAndUpdate({
        userId: userId
    }, {
        $push: {
            workoutName: req.body.templateName,
            exercises: array,
            note: req.body.note
        }
    }, {
        new: true
    }, (err, doc) => {
        if (err) {
            console.log("Something went wrong");
            console.log(err);
        }
        else{
            console.log("Added to template");
        }
        res.status(200).send("Successfully added to template.");
    });
});



module.exports = router;