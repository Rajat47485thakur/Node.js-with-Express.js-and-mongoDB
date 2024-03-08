const express= require('express');
const app = express();
const port = 3000;

app.use(express.json())

app.post('/calculate',(req,res)=>{
    console.log(req.body,"body")
    res.send('Welcome to the calculator app!');
});
app.post('/add',(req,res)=>{
    const{a,b}=req.body;
    const sum=(a+b);
    console.log(sum);
    return res.json(sum);
})
app.post('/minus',(req,res)=>{
    const{a,b}=req.body;
    const minus=(a-b);
    console.log(minus);
    return res.json(minus);
})
app.post('/multiply',(req,res)=>{
    const{a,b}=req.body;
    const multiply=(a*b);
    console.log(multiply);
    return res.json(multiply);
})

app.post('/division',(req,res)=>{
    const{a,b}=req.body;
    const division=(a/b);
    console.log(division);
    return res.json(division);
})

app.listen(port,()=>{
console.log( `App is listening at http://localhost:${port}`)
});