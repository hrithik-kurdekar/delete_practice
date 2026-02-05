
from fastapi.testclient import TestClient
from app.main import app

client=TestClient(app)

def test_list():
    r=client.get("/todos")
    assert r.status_code==200
