import axios from "axios";
import dotenv from 'dotenv'
dotenv.config();
import {queryDocument , addDocuments} from '../db/chromaSetup.js';


const askGroq = async(prompt , userId , fileId) =>{

    const relatedChunks = await queryDocument(prompt  , userId , fileId );
    const newPrompt = `
    You are an AI assistant. Below is relevant information from a document:
    
    --- Start of Context ---
    ${formattedChunks}
    --- End of Context ---
    
    Based on this context, answer the following question:
    "${prompt}"
    
    Provide a clear and well-structured response.
`;

    const API_KEY = process.env.GROQ_API_KEY;
    try {
             
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama3-8b-8192",
                messages: [{ role: "user", content: newPrompt }],
                temperature: 0.7  // Adjust for creativity (0.1 = precise, 1.0 = creative)
            },
            {
                headers: { Authorization: `Bearer ${API_KEY}` }
            }
        );
        
        return response.data.choices[0].message.content;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}


export default askGroq;
