const express = require('express');
const routes = require('./routes');
const database = require('./database');
const app = express();
require("dotenv").config();




app.use(express.json());
app.use('/', routes);




app.listen(process.env.PORT, () => {
    console.log(`Server is listning on http://localhost:${process.env.PORT}`)
    database.mongoDB();
});