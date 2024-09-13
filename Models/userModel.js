const mongoose = require('mongoose');

//Schema

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name must be required with String"],
        maxLength:[20,"Maximum Length 20 characters"]
    },
    email:{
        type:String,
        required:[true,"Email must be required with String"],
        match:[/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,"Email must be Valid Format"]
    },
    password:{
        type:String,
        required:[true,"Password must be required with string"],
        min:[8,"Minimum Length 8 Characters"],
        max:[12,"Maximum Length 12 Characters"]
    }
},
{timestamps:true})

//Model

const userModel=mongoose.model("users",userSchema);

//exports

module.exports=userModel;