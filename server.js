const express = require('express');//import the library
const port = 3000;
const bodyParser = require('body-parser');//body-parder is called middleware
const app = express();//use the library

app.use(bodyParser.json());//use the middleware (call it before anything else happens on each request)

app.listen(port, ()=>{
    console.log("listening...")
});

app.get('/',(req,res)=>{//every time something calls your API, that is a request
    res.send("HOLY CRAP ITS WORKING!")//a response is when an API gives the inofrmation requested
});

app.post('/login',(req,res)=>{//a post is when a client sends information to an API
    console.log('Request Body', JSON.stringify(request.body));
    const loginRequest = request.body;
    if (loginRequest.userName=="jacobjacob@gmail.com" && loginRequest.password=="P@ssw0rd"){
        response.status(200);
        response.send("Welcome");
    } else{
        response.status(401);
        response.send("Unauthorized");
        }
});
