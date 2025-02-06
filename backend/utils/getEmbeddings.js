import axios from "axios";
import dotenv from 'dotenv'
dotenv.config();

const JINA_API_KEY = process.env.JINA_API_KEY;

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
export default getEmbeddings;