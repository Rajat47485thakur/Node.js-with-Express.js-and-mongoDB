const express = require('express');
const Joi = require('joi');
const app = express();
const port = 3000;
const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/test';
mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

app.use(express.json());

const testDataSchema = new mongoose.Schema({
    name: String,
    place: String,
    age: Number
});

const Testdata = mongoose.model('Testdata', testDataSchema);

const schema = Joi.object({
    name: Joi.string().required(),
    place: Joi.string().required(),
    age: Joi.number().integer().min(10).max(60).required()
});

app.post('/data', async (req, res) => {
    try {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details);
        }
        const { name, place, age } = req.body;
        await Testdata.create({
            name,
            place,
            age
        });
        res.send(`Data received and validated successfully.`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});

