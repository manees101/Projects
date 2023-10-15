require("dotenv").config();
const connectDB=require("./db/connect");
const products=require("./models/product");
const productsJson=require('./products.json');
const start=async()=>{
    try{
         await connectDB(process.env.DB_URI);
         await products.create(productsJson);
         process.exit(0); //to exit the code after running successful 0 means everthing went well
    }
    catch(err)
    {
        console.log(err);
        process.exit(1); 
    }
}

start();