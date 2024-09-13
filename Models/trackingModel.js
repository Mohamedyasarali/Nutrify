const mongoose = require('mongoose');

//Schema

const trackingSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"userID must be required"]
    },
    foodId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foods",
        required:[true,"foodID must be required"]
    },
    details:{
        protein:Number,
        carbohydrates:Number,
        calories:Number,
        fat:Number,
        fiber:Number
     },
    eatenDate:{
        type:String,
        default:new Date().toLocaleDateString()
    },
    quantity:{
        type:Number,
        min:[1,"Minimum Length should be 1 Characters"],
        required:[true,"Quantity must be required"]
    }
},
{timestamps:true})

//Model

const trackingModel=mongoose.model("trackings",trackingSchema);

//exports

module.exports=trackingModel;