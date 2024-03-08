const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())


app.post('/calculator', (req, res) => {
    const { num1, operator, num2 } = req.body;
    let result;
    switch (operator) {
        case '+':
            result = Number(num1) + Number(num2);
            break;
        case '-':
            result = Number(num1) - Number(num2);
            break;
        case '*':
            result = Number(num1) * Number(num2);
            break;
        case '/':
            result = Number(num1) / Number(num2);
            break;
        default:
            return res.status(400).json({ error: "Invalid Operator" })
    }

    console.log(result);
    return res.json(result );
})

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});