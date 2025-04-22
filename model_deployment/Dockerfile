FROM python:3.11-slim

# Set working directory
WORKDIR /app

COPY bert_model ./bert_model
COPY predict_bert.py ./predict_bert.py

# Install required Python packages
RUN pip install --no-cache-dir torch transformers

# Allow this module to be importable
ENV PYTHONPATH=/app

# Default to Python shell 
CMD ["python3"]
