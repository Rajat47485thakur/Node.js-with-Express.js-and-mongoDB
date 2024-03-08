const express = require('express');
const app = express();
const port = 3000;
app.use(express.json())

let promise2 = new Promise(function (resolve, reject) {
    try {
        setTimeout(() => {
            const isOrderReady = false;
            if (isOrderReady) {
                return resolve("Your Order is ready");
            }
            else {
                return reject("Sorry your order is not ready")
            }
    
        }, 3000);
    } catch (error) {
        console.log(error,"1")
    }
});

// promise2.then((message)=>{
//     res.send(message);
// }).catch((error)=>{
//     res.send(error);
// });

function expressOrder(req, res) {
    promise2.then((message) => {
        res.send(message);
    }).catch((error) => {
        res.status(503).send(error);
    });
}

app.get('/order', expressOrder);
app.listen(port, () => {
    console.log(`This is the order Status: http://localhost:${port}`)
})  

