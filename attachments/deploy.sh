#!/bin/bash
# AIUIOG v4.0 — Deploy Script (Bash wrapper)
set -e

echo "🚀 AIUIOG v4.0 — Deploy"
echo "   Owner: Коваль Дмитрий Николаевич"

# Install dependencies
pip install -r requirements.txt --quiet

# Deploy agents
python deploy.py

# Start server
echo "▸ Starting server on :8000..."
python main.py
