const today = new Date();
const day = today.getDay();
const daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

console.log(`Today is :${daylist[day]}`);

let hour = today.getHours();
let minute = today.getMinutes();
let second = today.getSeconds();


let = prepand = (hour >= 12) ? "PM" : "AM";
// This line of code is same but ternary operator is used here 
// if (hour >= 12) {
//     prepand = "PM";
// } else {
//     prepand = "AM";
// }

hour = (hour >= 12) ? hour - 12 : hour;

//This line of code is same but ternary {?}operator is used here 
// if (hour >= 12) {
//     hour = hour - 12;
// } else {
//     hour = hour;
// }


if (hour === 0 && prepand === 'PM') {
    if (minute === 0 && second === 0) {
        hour = 12;
        prepand = 'Noon'
    }
    else {
        hour = 12;
        prepand = 'PM'
    }
}
if (hour === 0 && prepand === 'AM'){
    if(minute === 0 && second ===0){
hour =12;
prepand='Midnight'
    }
    else{
        hour=12;
        prepand = 'AM'
    }
}

console.log(`Current Time : ${hour}:${minute}:${second} ${prepand}`);