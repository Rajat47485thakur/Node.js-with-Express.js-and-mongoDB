// let arr = [10,20,30,45,99,100,100,90,99,0,4];


let arr = [10, 20, 30, 45, 99, 100, 100, 90, 99, 0, 4];



let uniqueElement = new Set(arr);
let uniqueArr = Array.from(uniqueElement);
function bubbleSort(arr) {
    for (let i = arr.length; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr;
}
let SortedArr = bubbleSort(uniqueArr);
console.log(SortedArr);
console.log(SortedArr.length);

let largestno = 10; //_____---___---___----___---____--___---


if (largestno <= SortedArr.length) {
    let nthNo = SortedArr[largestno - 1];

    console.log(`${largestno}th largest No is : ${nthNo}`);
}

else {
    console.log(`There is only ${SortedArr.length} elements in the array`)
}






// print prime no till nth position for example 20.?