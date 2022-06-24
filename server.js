const express = require('express');//import the library
const port = 443;
const https = require('https');
const bodyParser = require('body-parser');//body-parser is called middleware
const md5 = require('md5');
const {createClient} = require('redis');
const fs = require('fs');


const redisClient = createClient(
    {
        url: 'redis://default:wowyzowy@10.128.0.2:6379'
//        socket:{
//            port: 6379,
//            host: '127.0.0.1'
//        }
    }
);


const app = express();//use the library
app.use(bodyParser.json());//use the middleware (call it before anything else happens on each request)




https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
    passphrase: 'P@ssw0rd',
}, app).listen(port, async ()=>{
    await redisClient.connect();
    console.log("listening on port:"+port);
});


//app.post('/login',async (req,res)=>{}//a post is when a client sends information to an API
const validatePassword = async(req,res) => {
    
    const reqHashedPassword = md5(req.body.password);
    const redisHashedPassword = await redisClient.hGet('password',req.body.userName);
    const loginRequest = req.body;
    console.log('Request Body',JSON.stringify(req.body));
    

    //const password = await redisClient.hmGet(req.body.userName)

    if (reqHashedPassword == redisHashedPassword){
        res.status(200);
        res.send("Welcome");
    } else{
        res.status(401);
        res.send("Unauthorized");
        }
};



const signup = async(req,res) =>{

    const hashedNewPassword = md5(req.body.newPassword);
    await redisClient.hSet('password', req.body.newUserName, hashedNewPassword);
    res.status(200);
    res.send({result:"Saved"});

}




app.get('/',(req,res)=>{//every time something calls your API, that is a request
    res.send("HOLY CRAP ITS WORKING!")//a response is when an API gives the inofrmation requested
});




app.post('/signup', signup);

app.post('/login', validatePassword);