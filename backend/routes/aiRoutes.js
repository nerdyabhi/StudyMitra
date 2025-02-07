import express from 'express'
const router = express.Router();

import splitTextIntoChunks from '../db/splitChunks.js';
import { addDocuments } from '../db/chromaSetup.js';
import askGroq from '../ai/aiUtils.js';
router.post('/addDocument' , async(req , res)=>{
    const {document , userId  ,fileId} = req?.body;
    if(!document || !userId || !fileId) {
        res.status(400).json({success:false , message:"Send a valid document i.e Really large text document"});
        return;
    }

    try {
    const docs = splitTextIntoChunks(document);
    await addDocuments(docs , userId , fileId );
    res.status(200).json({message:"Successfully added to docs" , success:true})  
    } catch (error) {
        res.status(500).json({message:"Failed to perform so : " , success:false , error:error.message});
    }

})

router.post('/ask' , async(req, res)=>{
    const {prompt , userId , fileId} = req.body;
    if(!prompt || !userId || !fileId){
        res.status(500).json({message:"Please send valid prompt" , success:false});
        return;
    }

    const content = await askGroq(prompt , userId , fileId);
    res.status(200).json({message:"Hurray We got the response " , content , success:true , })
})
export default router;