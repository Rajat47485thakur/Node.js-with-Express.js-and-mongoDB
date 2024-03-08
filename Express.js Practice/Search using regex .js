const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

const app = express();
const port = 8000;


app.use(bodyParser.json());
const mongoURI = 'mongodb://localhost:27017/rajatKart';

app.get('/search', async (req, res) => {
    try {
        const { name } = req.body;
        const client = await mongodb.MongoClient.connect(mongoURI);
        const db = client.db();

        // Construct MongoDB query using regex
        const regex = new RegExp(name, 'i'); // 'i' for case-insensitive matching
        const regexQuery = { name: { $regex: regex } };

        // Perform search
        const results = await db.collection('items').find(regexQuery).toArray();

        // Close MongoDB connection
        await client.close();

        // Send search results
        res.json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});