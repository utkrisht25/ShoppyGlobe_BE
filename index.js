import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();


const app = express();
const PORT = 5500;
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

mongoose.connect(process.env.MONGO)
.then(()=> console.log("connected to database"))
.catch(err => console.log(err))

app.get('/',(req,res)=>{
    res.send("sever is running on this port")
})
app.listen(PORT, ()=>console.log(`server is running on ${PORT}`))