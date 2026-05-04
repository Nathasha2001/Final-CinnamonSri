from fastapi import APIRouter

router = APIRouter(prefix="/harvest", tags=["harvest"])

@router.get("/")
def get_harvest_status():
    return {"message": "Harvest feature scaffolding is ready"}
