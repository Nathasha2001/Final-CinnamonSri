import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from features.prediction.router import router as prediction_router
from features.drying.router import router as drying_router
from features.harvest.router import router as harvest_router
from features.disease.router import router as disease_router
from core.database_service import close_mongodb_connection, connect_to_mongodb, get_database

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Server starting up...")
    
    # Optional: connect when MONGODB_URI is provided
    logger.info("Attempting MongoDB connection...")
    try:
        connect_to_mongodb()
        db = get_database()
        if db is not None:
            logger.info("✓ Successfully connected to MongoDB")
        else:
            logger.warning("✗ MongoDB connection failed - database operations will be unavailable")
    except Exception as e:
        logger.error(f"MongoDB connection error: {e}")
    
    yield
    
    logger.info("Closing MongoDB connection...")
    close_mongodb_connection()
    logger.info("Server shutdown complete")


app = FastAPI(title="CinnOracle Backend", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request, call_next):
    logger.info(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    return response

app.include_router(prediction_router)
app.include_router(drying_router)
app.include_router(harvest_router)
app.include_router(disease_router)


@app.get("/health")
def health():
    db = get_database()
    is_connected = db is not None
    return {
        "status": "ok",
        "db_connected": is_connected,
        "db_status": "Connected" if is_connected else "Not Connected"
    }
