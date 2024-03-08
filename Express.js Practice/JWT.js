const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = "secretKey"
const port = 3000;

app.get('/', (req, res) => {
    res.json({
        massage: "Welcome to our API"

    })  
});

app.post('/login', (req, res) => {
    const user = {
        id: 45,
        username: "rjat",
        email: "rajat@gmail.com",
    }
    jwt.sign({ user }, secretKey, { expiresIn: '300s' }, (err, token) => {
        res.json({
            token
        })
    })
})

app.post('/profile', verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, function (err, authData) {
        if(error){
            res.send({result:"invalid token"})
        }else{
            res.json({
                massage:"Profile accessed",authData 
            })
        }
    })
})
function verifyToken(req, res, next) {
    const bearerHeader = req.hdeaders['Authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearera[1];
        req.token = token;
        next();
    } else {
        res.send({
            result: 'Token is not valid'
        })
    }
}


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
});