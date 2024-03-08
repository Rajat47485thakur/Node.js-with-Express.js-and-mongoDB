
// __--__--___-___--___-__--___-___with switch(operatore)

let digit1 = "1";
let digit2 = 1;
let operator = '+';

let result;
switch (operator) {
    case '+':
        result = Number(digit1) + Number(digit2);
        break;
    case '-':
        result = Number(digit1) - Number(digit2);
        break;
    case '*':
        result = Number(digit1) * Number(digit2)
        break;
    case '/':
        result = Number(digit1) / Number(digit2)
        break;
    default:
        console.log("Error! Please enter a valid operator (+,-,*,/)");
}
console.log(`Result of ${Number(digit1)} ${operator} ${Number(digit2)} = ${result}`)



