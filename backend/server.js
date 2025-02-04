import express, { urlencoded } from 'express';
const app = express();
import cors from 'cors';

import userRoutes from './routes/userRoutes.js'
import mongoose from 'mongoose';
import connectToDB from './utils/dbConnection.js';
// Main Middle-ware 
app.use(cors());
app.use(express.json());
app.use(urlencoded({extends:false}));

/**Connect Mongodb  */
connectToDB();
/* @Routes  */

app.use('/user' , userRoutes);


/** Last Basic code*/
app.get('/' , (req , res)=>{
    res.send("Hello world ! Study Mitra")
})

app.listen(3000 , (req , res)=>{
    console.log("Server running fine at http://localhost:3000");
    
})