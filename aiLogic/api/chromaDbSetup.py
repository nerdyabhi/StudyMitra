from fastapi import FastAPI, HTTPException
import chromadb
from pydantic import BaseModel

app = FastAPI()
chroma_client = chromadb.PersistentClient(path="./chroma_db")





# Pydantic model for request validation
class CreateCollectionRequest(BaseModel):
    name: str
    metadata: dict = None
    embedding_dimension: int = None

@app.get("/")
def read_root():
    return {"message": "ChromaDB is running!"}

@app.get("/collections")
def get_collections():
    return chroma_client.list_collections()

@app.post("/create_collection")
def create_collection(request: CreateCollectionRequest):
    try:
        # Create a new collection in ChromaDB
        collection = chroma_client.create_collection(
            name=request.name,
            metadata=request.metadata,
            embedding_function=emb_fn,
        )
        return {"message": "Collection created", "collection": collection.name}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)