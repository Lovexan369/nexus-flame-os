import os
from dotenv import load_dotenv

load_dotenv()

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN", "")
MY_TELEGRAM_ID = int(os.getenv("MY_TELEGRAM_ID", "0"))
MY_USERNAME = os.getenv("MY_USERNAME", "@your_username")

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite+aiosqlite:///./data/leads.db"
)

MODEL_PATH = os.getenv("MODEL_PATH", "predictor/model.catboost")
