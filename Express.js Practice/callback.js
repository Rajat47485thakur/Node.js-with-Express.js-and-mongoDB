function mainFunction(callback) {
    console.log("Main function is running...");
    setTimeout(() => {
        console.log("Asynchronous operation complete.");
        callback(); // Execute the callback function
    }, 1000);
}

function callbackFunction() {
    console.log("Callback function is running...");
}

// Call the main function and pass the callback
mainFunction(callbackFunction);