const express = require('express');
const validation = require("./validation");
const app = express();
const port = 3000;

app.use(express.json())

app.post('/calculator', async (req, res) => {
    await validation.schema.validateAsync(req.body);
    const { num1, operator, num2 } = req.body;

    if (num1 && !num2) {
        return res.json(num1);

    } else if (!num1 && num2) {
        return res.json(num2);
    }

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
    return res.json(result);
})

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});

