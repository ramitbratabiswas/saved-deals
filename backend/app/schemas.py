from pydantic import BaseModel

class DealCreate(BaseModel):
    title: str
    price: float
    url: str

class DealOut(BaseModel):
    id: int
    title: str
    price: float
    url: str

    class Config:
        from_attributes = True