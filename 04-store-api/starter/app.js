require("dotenv").config();
const express=require("express");
const app=express();
const errorHandler=require("./middleware/error-handler");
const notFound=require("./middleware/not-found");
const router=require("./routes/products");
const connectDB=require("./db/connect");
app.use(express.json());
app.use(errorHandler);
app.use("/api/v1/products",router);
app.use(notFound);
app.get("/",(req,res)=>{
    res.send("Hello world");
})

const start=async()=>{
    try
    {
      await connectDB(process.env.DB_URI);
      app.listen(4000,()=>{
        console.log("Listening on port 4000");
    })
    }
    catch(err)
    {
        console.log(err);
    }
}

start();