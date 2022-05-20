const express = require('express');//import the library
const port = 3000;
const bodyParser = require('body-parser');//body-parder is called middleware
const md5 = require('md5');
const {createClient} = require('redis');


const redisClient = createClient(
    {
        socket:{
            port: 6379,
            host: '127.0.0.1'
        }
    }
);


const app = express();//use the library
app.use(bodyParser.json());//use the middleware (call it before anything else happens on each request)


app.listen(port, ()=>{
    console.log("listening...")
});


//app.post('/login',async (req,res)=>{}//a post is when a client sends information to an API
const validatePassword = async(req,res) => {
    await redisClient.connect();
    const reqHashedPassword = md5(req.body.password);
    const redisHashedPassword = await redisClient.hGet('password',req.body.userName);
    const loginRequest = req.body;
    console.log('Request Body',JSON.stringify(req.body));
    

    //const password = await redisClient.hmGet(req.body.userName)

    if (loginRequest.userName=="jacobjacob@gmail.com" && loginRequest.password==hashedPasswordFromUser){
        res.status(200);
        res.send("Welcome");
    } else{
        res.status(401);
        res.send("Unauthorized");
        }
};

app.post('/login', validatePassword);

app.get('/',(req,res)=>{//every time something calls your API, that is a request
    res.send("HOLY CRAP ITS WORKING!")//a response is when an API gives the inofrmation requested
});
