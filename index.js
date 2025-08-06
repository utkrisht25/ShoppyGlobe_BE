import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const PORT = 5500;
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO)
.then(()=> console.log("connected to database"))
.catch(err => console.log(err))

app.get('/',(req,res)=>{
    res.send("sever is running on this port")
})
app.listen(PORT, ()=>console.log(`server is running on ${PORT}`))