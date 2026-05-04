from fastapi import APIRouter

router = APIRouter(prefix="/prediction", tags=["prediction"])

@router.get("/")
def get_prediction_status():
    return {"message": "Prediction feature scaffolding (CinnOracle) is ready"}
