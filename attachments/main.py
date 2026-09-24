"""
AIUIOG v4.0 — Replit Entrypoint
Запускает FastAPI сервер на порту 8000
"""
import uvicorn
from run_server import app

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info"
    )
