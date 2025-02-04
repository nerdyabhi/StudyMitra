import express, { urlencoded } from 'express';
const app = express();
import cors from 'cors';

// Main Middle-ware 
app.use(cors());
app.use(express.json());
app.use(urlencoded({extends:false}));

app.get('/' , (req , res)=>{
    res.send("Hello world ! Study Mitra")
})

app.listen(3000 , (req , res)=>{
    console.log("Server running fine at http://localhost:3000");
    
})