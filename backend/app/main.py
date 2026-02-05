
from fastapi import FastAPI,Depends
from sqlalchemy.orm import Session
from .database import Base,engine,SessionLocal
from . import models,schemas

Base.metadata.create_all(bind=engine)
app=FastAPI()

def get_db():
    db=SessionLocal()
    try:yield db
    finally:db.close()

@app.get("/todos")
def get_all(db:Session=Depends(get_db)):
    return db.query(models.Todo).all()

@app.post("/todos")
def create(todo:schemas.TodoCreate,db:Session=Depends(get_db)):
    t=models.Todo(title=todo.title)
    db.add(t);db.commit();db.refresh(t)
    return t

@app.put("/todos/{id}")
def update(id:int,data:schemas.TodoUpdate,db:Session=Depends(get_db)):
    t=db.query(models.Todo).get(id)
    t.completed=data.completed
    db.commit();return t

@app.delete("/todos/{id}")
def delete(id:int,db:Session=Depends(get_db)):
    t=db.query(models.Todo).get(id)
    db.delete(t);db.commit()
    return {"ok":True}
