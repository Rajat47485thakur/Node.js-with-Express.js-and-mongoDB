let digit1 = 10;
let digit2 = 5;
let operator = '/'; 


let result;
if (operator === '+') {
  result = digit1 + digit2;
} else if (operator === '-') {
  result = digit1 - digit2;
} else if (operator === '*') {
  result = digit1 * digit2;
} else if (operator === '/') {
  result = digit1 / digit2;
} else {
  console.log('Invalid operator');
}


console.log(`Result of ${digit1} ${operator} ${digit2} = ${result}`);