const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const User = require('./models/User');

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DBConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post("/add", async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const saveUser = await user.save();
        console.log("Success");
    } catch (err) {
        console.log("Failed");
        res.status(400).send(err);
    }
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});