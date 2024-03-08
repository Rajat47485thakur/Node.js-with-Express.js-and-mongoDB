const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');



const app = express();
const port = 8000;
const url = 'mongodb://localhost:27017/Populate';

mongoose.connect(url)
    .then(() => console.log('Connected to mongodb'))
    .catch(error => console.log('Failed to connect to mongodb', error));

app.use(express.json());
app.use('/', routes);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
