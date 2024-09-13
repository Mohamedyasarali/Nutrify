const mongoose = require('mongoose');

//Schema

const foodSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name must be required with String"]
    },
    calories:{
        type:Number,
        required:[true,"Calories must be required with Number"]
    },
    protein:{
        type:Number,
        required:[true,"Protein must be required with Number"]
    },
    fat:{
        type:Number,
        required:[true,"Fat must be required with Number"]
    },
    fiber:{
        type:Number,
        required:[true,"Fiber must be required with Number"]
    },
    carbohydrates:{
        type:Number,
        required:[true,"Carbohydrates must be required with Number"]
    },
},
{timestamps:true})

//Model

const foodModel=mongoose.model("foods",foodSchema);

//exports

module.exports=foodModel;