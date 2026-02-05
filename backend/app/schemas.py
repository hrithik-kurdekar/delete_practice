
from pydantic import BaseModel

class TodoCreate(BaseModel):
    title:str

class TodoUpdate(BaseModel):
    completed:bool

class TodoOut(BaseModel):
    id:int
    title:str
    completed:bool
    class Config:
        from_attributes=True
