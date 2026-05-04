from fastapi import APIRouter

router = APIRouter(prefix="/disease", tags=["disease"])

@router.get("/")
def get_disease_status():
    return {"message": "Disease feature scaffolding is ready"}
