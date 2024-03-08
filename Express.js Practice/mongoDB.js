const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;


const url = 'mongodb://localhost:27017/ID';
mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));


app.use(express.json());

//schema validations
const User = mongoose.model('user', {
    username: {type :String,require :true, unique: true}, 
    password: {type: String,require :true},
    age: {type: Number, require: true, min:18, max:60}
});


//age Task
// const User = User.createIndexes({username:1},{unique:true});
app.post('/add', async (req, res) => {
    try {
    
       const{username,password,age}= req.body;
       const hash = await bcrypt.hash(password,13)

      await User.create({
            username,
            password:hash,
            age
        });
        res.status(201).send(`New User created successfully with password : ${hash}`);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Error adding user');
    }
});


app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});