import axios from "axios";

const BASE_URL = "http://localhost:8000"; // ChromaDB API

async function createCollection() {
    try {
        const response = await axios.post(`${BASE_URL}/create_collection`, {
            name: "LexicalFile",
            metadata: {
                description: "Collection for storing user notes"
            },
            embedding_dimension: 128 // Example dimension
        });

        console.log("Collection Created:", response.data);
    } catch (error) {
        console.error("Error creating collection:", error.response?.data || error.message);
    }
}

createCollection();