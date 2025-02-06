import { ChromaClient } from "chromadb";
import axios from "axios";
const CHROMA_URL = process.env.CHROMA_URL;
import dotenv from 'dotenv';
dotenv.config();


const JINA_API_KEY = process.env.JINA_API_KEY;


async function main() {
    const text = "Hello world, this is an embedding test!";
    
    console.log("🤖 Generating embedding for:", text);
    const embedding = await getEmbeddings(text);
    
    console.log("🧠 Embedding Vector:", embedding);
}

main();
