function firstFunction() {
    console.log("Inside firstFunction");
    secondFunction(); // Call secondFunction
}

function secondFunction() {
    console.log("Inside secondFunction");
    thirdFunction(); // Call thirdFunction
}

function thirdFunction() {
    console.log("Inside thirdFunction");
}

// Call the first function to start the chain of function calls
firstFunction();