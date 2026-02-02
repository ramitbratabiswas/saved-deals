from fastapi import APIRouter, Depends, HTTPException
from app.schemas import DealCreate, DealOut
from app.models import Deal
from app.database import get_db

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

router = APIRouter(prefix="/deals", tags=["deals"])

@router.get("/", response_model=list[DealOut])
def list_deals(db: Session = Depends(get_db)):
    return db.query(Deal).all()

@router.post("/")
def create_deal(deal: DealCreate, db: Session = Depends(get_db)):
    new_deal = Deal(
        title=deal.title,
        price=deal.price,
        url=deal.url
    )

    db.add(new_deal)

    try: 
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Deal with this URL already exists",)

    db.refresh(new_deal)
    return new_deal

@router.delete("/{deal_id}", status_code=204)
def delete_deal(deal_id: int, db: Session = Depends(get_db)):
    deal = db.query(Deal).filter(Deal.id == deal_id).first()

    if deal is None:
        raise HTTPException(status_code=404, detail="Deal not found",)
    
    db.delete(deal)
    db.commit()