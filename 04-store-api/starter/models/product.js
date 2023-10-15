const mongoose=require("mongoose");

const productsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product name must be provided"],

    },
    price:{
      type:String,
      required:[true,"Price is required"]
    },
    featured:{
       type:Boolean,
       default:false      
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
       type:Date,
       default:Date.now()
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:'{VALUES} is not supported'
        }
        // enum:['ikea','liddy','caressa','marcos']
    }
})

module.exports=mongoose.model("Product",productsSchema);