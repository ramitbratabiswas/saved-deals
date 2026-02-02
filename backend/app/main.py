from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.deals import router
from app.models import Base
from app.database import engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/health")
def health():
    return { "status": "ok" }