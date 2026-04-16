# Use stable Python version
FROM python:3.10-slim

# Set working directory
WORKDIR /code

# Install system dependencies (important)
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (better caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Create cache + temp directories
RUN mkdir -p /code/model_cache /code/temp_docs

# Set environment for HuggingFace cache (important)
ENV HF_HOME=/code/model_cache

# Expose port (optional but good practice)
EXPOSE 7860

# Start FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]