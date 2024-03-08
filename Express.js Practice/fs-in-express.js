const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    fs.appendFile('appendFile.txt',' I am a appended file',(err)=>{
        if(err) {
            console.error(err);
            return res.sendStatus(500).send(`Error occurred while saving the FIle's content.`)
        }
        console.log(`Content Successfully Saved`);
        res.send(`Content Successfully Saved`)
    });
});
                          
app.listen(port, () => {
    console.log(`The server is rinning at http://localhost:${port}`)
});

// http METHODS
// get, post, put, delete, patch