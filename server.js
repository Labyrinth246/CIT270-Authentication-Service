const express = require('express');//import the library
const port = 3000;
const app = express();//use the library


app.listen(port, ()=>{
    console.log("listening...")
});

app.get('/',(req,res)=>{
    res.send("HOLY CRAP ITS WORKING!")
});

