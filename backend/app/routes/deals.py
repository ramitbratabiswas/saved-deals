from fastapi import APIRouter
from app.schemas import DealCreate

router = APIRouter(prefix="/deals")

@router.get("/")
def list_deals():
    return ["bro", "haha", "u really thought"]

@router.post("/")
def create_deal(deal: DealCreate):
    return deal