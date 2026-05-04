from fastapi import APIRouter

router = APIRouter(prefix="/drying", tags=["drying"])

@router.get("/")
def get_drying_status():
    return {"message": "Drying feature scaffolding is ready"}
