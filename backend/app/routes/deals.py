from fastapi import APIRouter, Depends
from app.schemas import DealCreate
from app.database import get_db

from sqlalchemy.orm import Session
from sqlalchemy import select

router = APIRouter(prefix="/deals")

@router.get("/")
def list_deals():
    return ["bro", "haha", "u really thought"]

@router.post("/")
def create_deal(deal: DealCreate, db: Session = Depends(get_db)):
    return deal