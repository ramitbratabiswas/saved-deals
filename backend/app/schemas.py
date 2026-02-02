from pydantic import BaseModel

class DealCreate(BaseModel):
    title: str
    price: float
    url: str