FROM ghcr.io/astral-sh/uv:debian

# Copy to container
WORKDIR /code
COPY pyproject.toml /code/pyproject.toml
COPY ./app /code/app
COPY ./research /code/research

# Download dependencies
RUN uv sync

# Run the app
CMD ["uv", "run", "fastapi", "run", "app/main.py", "--host", "0.0.0.0","--port", "8000"]