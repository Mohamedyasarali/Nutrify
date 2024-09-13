const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//DBMS

//Connection

mongoose.connect("mongodb://localhost:27017/apidev-test")
.then(()=>{
    console.log("Database Connection Successfully")
})
.catch((err)=>{
    console.log(err);
})

//Schema

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name must be required With String"],
        maxLength:[20,"Maximum Length 20 Characters"]
    },
    emailId:{
        type:String,
        required:[true,"Email must be required With String"],
        match:[/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,"Mail Must be Valid Fomat"]
    },
    password:{
        type:String,
        required:[true,"Password must be required With String"],
        min:[8,"Minimum Length 8 Characters"],
        max:[12,"Maximum Length 12 Characters"]
    }
},
{timestamps:true})

//Model

const userModel=mongoose.model("mongotests",userSchema);

//Express OBJ

const app=express();

//Middleware 

app.use(express.json());

//Register

app.post("/register",(req,res)=>{
    let userCred=req.body;

    //Bcrypt Hash Password

    bcrypt.genSalt(10,(err,salt)=>{
        if(err===null){
            bcrypt.hash(userCred.password,salt,(err,hash)=>{
                if(err===null){
                    // console.log(hash);
                    userCred.password=hash;

                    userModel.create(userCred)
                    .then((document)=>{
                        // console.log(document);
                        res.status(201).send({data:document,message:"Registration Successfully"});
                    })
                    .catch((err)=>{
                        res.status(500).send({mesage:"Registration Failed Please Try Again"});
                    })
                }
                else{
                    res.status(500).send({message:"Failed to Hash Password"})
                }
            })
        }
    })
})

//Login

app.post("/login",(req,res)=>{
    let userLog=req.body;

    userModel.findOne({emailId:userLog.emailId})
    .then((userCred)=>{
        // console.log(userCred);
        if(userCred!==null){

            //Compare hash password

            bcrypt.compare(userLog.password,userCred.password,(err,result)=>{
                if(result===true){
                    // console.log(result);
                    jwt.sign({emailId:userLog.emailId},"Nachiyasarkey",(err,token)=>{
                        if(err===null){
                            res.send({token:token})
                        }
                        else{
                            res.end({message:"some issue while creating token Please Try Again "})
                        }
                    })
                    // res.status(200).send({message:"Login Successfully"})
                }
                else{
                    // console.log(err);
                    res.status(401).send({message:"Incorrect Password"})
                }
            })
        }
        else{
            res.status(404).send({message:"Invalid Email Please Try Again"})
        } 
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).send({message:"Login Failed Please Try Again"})
    })
})

//endpoints

app.get("/getdata",verifyToken,(req,res)=>{
    res.send({message:"getData Working"})
})

//Middleware for VerifyToken as endpoints

function verifyToken(req,res,next){
   const token =req.headers.authorization.split(" ")[1];

    // res.send({mesage:"verifyToken Successfully"})

    //verifyToken
    jwt.verify(token,"Nachiyasarkey",(err,decoded)=>{
        if(err===null){
            console.log(decoded);
            next();
        }
        else{
            res.send({message:"Invalid Token Please Try Again "})
        }
    })
}

//Server Connection

app.listen(8000,(err)=>{
    if(err==null){
        console.log("Server Conncetion Successfully");
    }
})