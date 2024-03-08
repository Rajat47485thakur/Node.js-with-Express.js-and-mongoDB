const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const app = express();


const port = 3000;
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/singup';
mongoose.connect(url)
    .then(() => console.log('Connected to mongodb'))
    .catch(error => console.log('Failed to connect to mongodb', error))

app.use(express.json());

const data = mongoose.model('rajat', {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 }
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const removeSpace = schema.validate({username, password});
    if(removeSpace.error){
        return res.status(400).json(removeSpace.error.details[0].message);
    }
    const pass = await bcrypt.hash(password, 10);

    try {
        const existingUser = await data.findOne({ username });
        if (existingUser) {
            res.status(400).json(`(${username}) Username already exists`);
        }
        await data.create({
            username,
            password: pass
        });

        return res.status(201).json(`User ${username} created`);
    } catch (error) {
        res.status(500).json(error);
    }
});

// to findBy_id we can do find({}) first
app.get('/findAll', async (req, res) => {
    try {
        const findall = await data.find({});
        res.status(200).json(findall);
    } catch (error) {
        res.status(500).json(`Unable to find the User Info !${error}`);
    }
});


app.get('/find', async (req, res) => {

    try {
        const { _id } = req.body;
        const info = await data.findOne({ _id });
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json(`${error} can't find user with this ${username}`);
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and Password is required' });
    }
    try {
        const existingUser = await data.findOne({ username });
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }


        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {

            return res.status(401).json({ error: 'Invalid password' });
        }


        jwt.sign({ username }, "secretKey", (error, token) => {
            if (error) {
                return res.status(500).json({ error: 'Failed to generate token' });
            }
            res.json({ token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/profile', verifyToken, (req, res) => {
    jwt.verify(req.headers.authorization, "secretKey", (error, userData) => {
        if (error) {
            console.log(error, "error")
            res.send({ result: "Invalid Token" })
        }
        else {
            res.json({
                massage: "Profile accessed",
                userData
            })
        }
    })
});
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.status(401).json({
            result: 'Token is not valid'
        });
    }
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});