import express from 'express'
const router = express.Router();
import jwt from 'jsonwebtoken'

import { userModel } from '../models/user.model.js';
import { hashPassword } from '../utils/hashPassword.js';


import { userSignupSchema } from '../utils/userValidationSchema.js';
import { generateAuthToken } from '../utils/jwt.js';
router.post('/signup' , async(req , res)=>{
    console.log(req.body);
    
    const result = userSignupSchema.safeParse(req.body);
    if(!result.success){
        res.status(400).json({success:false , message:"Please send valid data"});
        return;
    }

    const {fullName , email , password , avatarUrl} = req.body;

    try{
        const hashedPassword = await hashPassword(password );
        const user = await userModel.create({
            fullName,
            email , 
            password:hashedPassword , 
            avatarUrl:avatarUrl?avatarUrl:"https://nerdyabhi.github.io/Cara/img/logo.png"
        })

        const token = generateAuthToken({ fullName: user.fullName, email: user.email });
        res.status(200).json({success:true , user , token});
    } catch (e) {
        if (e.code === 11000 && e.keyPattern && e.keyPattern.email) {
            res.status(400).json({ success: false, message: "Email already exists" });
        } else {
            res.status(500).json({ success: false, message: "An error occurred", error: e.message });
        }
    }
})


export default router;
