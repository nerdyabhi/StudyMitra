import { ChromaClient } from "chromadb";
import axios from "axios";
const CHROMA_URL = process.env.CHROMA_URL;
import dotenv from 'dotenv';
dotenv.config();


const JINA_API_KEY = process.env.JINA_API_KEY;
const askGroq = async(prompt) =>{
    const API_KEY = process.env.GROQ_API_KEY;
    try {
            
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama3-8b-8192",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7  // Adjust for creativity (0.1 = precise, 1.0 = creative)
            },
            {
                headers: { Authorization: `Bearer ${API_KEY}` }
            }
        );
        
        return response.data.choices[0].message.content;
    } catch (error) {
        console.log(error.message);
    }
}

async function getEmbeddings(text) {
    try {
        const response = await axios.post(
            "https://api.jina.ai/v1/embeddings",
            {
                model: "jina-embeddings-v2-base-en",
                input: text
            },
            {
                headers: {
                    Authorization: `Bearer ${JINA_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data.data[0].embedding;
    } catch (error) {
        console.error("Error fetching embeddings:", error.response?.data || error.message);
        return null;
    }
}


async function main() {
    const text = "Hello world, this is an embedding test!";
    
    console.log("🤖 Generating embedding for:", text);
    const embedding = await getEmbeddings(text);
    
    console.log("🧠 Embedding Vector:", embedding);
}

main();
