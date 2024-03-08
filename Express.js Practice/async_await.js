const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

function getBread() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Bread");
        }, 1000);
    });
}

function getCheese() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Cheese");
        }, 1500);
    });
}

function getVegitables() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Vegitables");
        }, 2000);
    });
}
async function makeSandwich(req, res) {
    try {
        const [bread, cheese, Vegitables] = await Promise.all([getBread(), getCheese(), getVegitables()]);

        const sandwich = (`Make sandwich with :${bread},${cheese}and ${Vegitables}.`);
        res.send(sandwich);
    } catch (error) {
        // console.error("Error occurred while making the sandwich:", error.message);
        res.status(503).send(`Error occurred  while making the sandwich ${error.message}`);
    }
}


app.get('/sandwich', makeSandwich);
app.listen(port, () => {
    console.log(`This is the website http://localhost:${port}`)
});