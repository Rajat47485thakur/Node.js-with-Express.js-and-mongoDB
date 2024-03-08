const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;


const url = 'mongodb://localhost:27017/ID-pass';
mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));


app.use(express.json());

//schema validations
const User = mongoose.model('user', {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    age: { type: Number, require: true, min: 18, max: 60 }
});


//age Task
app.post('/add', async (req, res) => {
    try {

        const { username, password, age } = req.body;
        const hash = await bcrypt.hash(password, 10)

        await User.create({
            username,
            password: hash,
            age
        });
        res.status(201).send(`New User created successfully with password : ${hash}`);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Error adding user');
    }
});


// TO Insert Many 

app.post('/insertMany', async (req, res) => {
    try {
        const users = req.body.users;
        const insertMany = await User.insertMany(users);
        console.log("Users successfully added:", insertMany);
        res.status(200).json(`Users successfully added: ${insertMany.length}`);
    } catch (error) {
        console.error("Error inserting many Users", error);
        res.status(500).json({ error: error });
    }
});
// To read the db   
//Find
app.get('/read', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(`Unable to read.`);
        res.status(500).send(`Unable to read.`);
    }
});

//FindOne
app.get('/findOne', async (req, res) => {
    try {
        const { _id } = req.body;
        const user = await User.findOne({ _id });
        if (!user) {
            res.status(404).json({ error: "User not found." });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json("Unable to find info.")
    }
});

// Update the username and password
app.put('/update-password/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const username = req.body.username;
        const password = req.body.password;
        const updatedUser = await User.findByIdAndUpdate(userId, { username, password }, { new: true });
        if (!updatedUser) {
            return res.status(404).send(`User not found`);
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(`Error updating User.`);
        res.status(500).send(`Error updating User`)
    }
});

// Only update the username
app.put('/update-username', async (req, res) => {
    const _id = req.body._id;
    const { username } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, { username }, { new: true });
        if (!updatedUser) {
            return res.status(404).send(`User not found`);
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating username:", error);
        res.status(500).json({ error: error });
    }
});
// UpdateMany username and password
app.put('/updateMany', async (req, res) => {
    try {
        const users = req.body.users;


        const updatedUsers = await Promise.all(users.map(async (user) => {
            const userId = user.id;
            const { username, password, age } = user;

            const updatedUser = await User.findByIdAndUpdate(userId, { username, password, age }, { new: true });

            return updatedUser;
        }));

        res.status(200).json(updatedUsers);
    } catch (error) {
        console.error('Error updating users:', error);
        res.status(500).json({ error: 'Error updating users' });
    }
});

// delete Username password
app.delete('/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const username = req.body.username;
        const password = req.body.password;
        const deletedId = await User.findByIdAndDelete(userId, { username, password }, { new: true })
        if (!deletedId) {

            return res.status(404).send(`User with ${userId} not found.`);
        }
        res.status(200).json(`user with ${userId} is successfully removed from database.`);
    } catch (error) {
        console.log(`Error deleting the user`);
        res.status(500).send(`Error deleting the user`);
    }
});

// TO delete the multipal id's from the data base
app.delete('/deleteMany', async (req, res) => {
    try {
        const idsToDelete = req.body._id;
        const deletedUsers = await User.deleteMany({ _id: { $in: idsToDelete } });

        if (deletedUsers.deletedCount === 0) {
            return res.status(404).send(`No users found.`);
        }

        res.status(200).json(`${deletedUsers.deletedCount} users successfully removed from the database.`);
    } catch (error) {
        console.log(`Error deleting users: ${error}`);
        res.status(500).send(`Error deleting users`);
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});
