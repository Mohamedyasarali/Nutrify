const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//DATABASE CSM

//Connection

mongoose.connect("mongodb://localhost:27017/apidev-test")
.then(()=>{
    console.log("Database Connection Successfully");
})
.catch((err)=>{
    console.log(err);
})

//Schema

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name must be required within String"],
        maxLength:[20,"Maximum Length should be 20 Characters"]
    },
    emailId:{
        type:String,
        required:[true,"Email must be required within String"],
        match:[/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,"Mail Must be Valid Fomat"]
    },
    password:{
        type:String,
        required:[true,"Password must be required within String"], 
        min:[8,"Minimum Length Should be 8 characters"],
        max:[12,"Maximum Length Should be 12 characters"]
    }
},
{timestamps:true})

//Model

const userModel=mongoose.model("mongotests",userSchema);


//Express Endpoints

const app=express();

//Middleware

app.use(express.json());

//Register

app.post("/register",(req,res)=>{
    const user=req.body;

    //generate bcrypt hash password

    bcrypt.genSalt(10,(err,salt)=>{
        if(err===null){
            bcrypt.hash(user.password,salt,(err,hash)=>{
                if(err===null){
                    // console.log(hash);
                    user.password=hash;

                    userModel.create(user)
                    .then((document)=>{
                        res.status(201).send({data:document,message:"User Registration Successfully"})
                    })
                    .catch((err)=>{
                        res.status(500).send({message:"Failed to User Registration"})
                    })
                }
            })
        }
    }) 
})

//endpoints to Login

app.post("/login",(req,res)=>{
    const userLog=req.body;

    userModel.findOne({emailId:userLog.emailId})
    .then((user)=>{
        // console.log(user);
        if(user!==null){

            //compare Password

            bcrypt.compare(userLog.password,user.password,(err,result)=>{
                if(result===true){

                    //generating Token 

                    jwt.sign({emailId:userLog.emailId},"yasarkey",(err,token)=>{
                        if(err===null){
                            res.send({token:token})
                        }
                        else{
                            res.status(500).send({message:"some issue while creating the token"})
                        }
                    })
                    
                    // res.status(200).send({message:"User Login Successfully"})
                }
                else
                {
                    res.status(401).send({message:"Incorrect Password"})
                }
            })
        }
        else{
            res.status(404).send({message:"Wrong Email"})
        }   
    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Failed to User Login"})
    })
})

// -------------------------------------->Another Connection<--------------------------------------------------------



//Schema

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name must be required within String"]
    },
    price:{
        type:Number,
        required:[true,"Price must be required within Number"]
    },
    stock:{
        type:Number,
        required:[true,"Stock must be required within Number"]
    },
    category:{
        type:String,
        enum:{
            values:["Clothing","Electronics","Home Appliances"],
             message:["{VALUE} is not Supported"]
        }
    }
},
{timestamps:true})

//Model

const productModel=mongoose.model("products",productSchema);

// app.use(express.json());


//endpoints to getData

app.get("/getdata",verifyToken,(req,res)=>{
    productModel.find()
    .then((data)=>{
        console.log(data);
        res.send({message:"Get Data Successfully"})
    })
    .catch((err)=>{
        res.send({message:"Failed to Get Data"})
    })
})

//endpoints to postdata

app.post("/postdata",verifyToken,(req,res)=>{
    const post=req.body;

    productModel.create(post)
    .then((document)=>{
        res.send({data:document,mesage:"Post Data Successfully"})
    })
    .catch((err)=>{
        res.send({message:"Failed to Post Data"})
    })
})

//endpoints to deleteData

app.delete("/deletedata/:id",verifyToken,(req,res)=>{

    productModel.deleteOne({_id:req.params.id})
    .then((info)=>{
        console.log(info);
        res.send({mesage:"Delete Data Successfully"})
    })
    .catch((err)=>{
        res.send({message:"Failed to Delete Data"})
    })
})

//endpoints to updatedata

app.put("/putdata/:id",verifyToken,(req,res)=>{
    const put=req.body;

    productModel.updateOne({_id:req.params.id},put)
    .then((info)=>{
        console.log(info);
        res.send({mesage:"Update Data Successfully"})
    })
    .catch((err)=>{
        res.send({message:"Failed to Update Data"})
    })
})




//middleware to verifyToken

function verifyToken(req,res,next){
    const token=req.headers.authorization.split(" ")[1]
    
    //verify Token

    jwt.verify(token,"yasarkey",(err,decoded)=>{
        if(err===null){
            console.log(decoded);
            next()
        }
        else{
            res.status(401).send({message:"Invalid Token Please Login Again"})
        }
    }) 
}


//Server Connection

app.listen(8000,()=>{
    console.log("Server Connection successfully");
})