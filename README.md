# AI Hackathon Template

A ready-made, full-stack template for hackathons involving AI/ML models with a web UI. Get from zero to a deployed prototype as fast as possible.

## Project Structure

```
.
├── frontend/          # React + Vite + Tailwind + shadcn/ui
│   └── src/
├── backend/
│   ├── app/           # FastAPI server & model inference
│   │   ├── main.py    # API endpoints (predict, analyze, invert, blend)
│   │   └── weights/   # Trained model weights (.pt)
│   └── research/      # PyTorch training pipeline
│       ├── train.py   # Training script
│       └── research/
│           ├── models.py    # Model architecture
│           └── datasets.py  # Dataset loading
└── Makefile           # Top-level dev commands
```

## Quick Start

### Prerequisites

- [uv](https://docs.astral.sh/uv/) (Python package manager)
- [Node.js](https://nodejs.org/) (v18+)

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### Running Locally
Note: `make` must be installed
```bash
# Frontend (port 8080)
make frontend

# Backend (port 8000)
make backend
```

Or run them individually:

```bash
cd frontend && npm install && npm run dev
cd backend && uv run fastapi dev
```

## Cookbook

1. **Frontend** — Drop your website into `frontend/`. Use any vibe coding tool (Google AI Studio, V0, Bolt.New, Google Stitch, etc.) or build it by hand.
2. **Model** — Train or download your model in `backend/research/`, then place weights in `backend/app/weights/`.
3. **API** — Expose your model from `backend/app/main.py`. The template ships with example endpoints for image prediction.
4. **Connect** — Point your frontend at the backend API on port `8000`.

## Backend API

The FastAPI server (`backend/app/main.py`) ships with four example endpoints:

| Endpoint | Method | Description |
|---|---|---|
| `/predict` | POST | Run model inference on an uploaded image |
| `/analyze` | POST | Return image metadata (format, mode, size) |
| `/invert` | POST | Invert image colors |
| `/blend` | POST | Average multiple images together |

Replace these with your own endpoints as needed.

## Research / Training

The `backend/research/` directory contains a PyTorch training pipeline built on [npfl138](https://github.com/ufal/npfl138) (a lightweight training framework from Charles University's Deep Learning course):

```bash
cd backend/research

# Train the model
make train

# Launch TensorBoard
make tensorboard
```

The example model is a CNN that compares pairs of MNIST digits (direct + indirect classification). Swap out the model architecture in `models.py` and the dataset in `datasets.py` for your own task.

## Deployment

### Frontend → Vercel

1. Create a [Vercel](https://vercel.com/) account.
2. Connect your GitHub repository.
3. Set the root directory to `frontend` and select Vite as the framework.
4. Pushes to `main` will auto-deploy.

### Backend → Fly.io

1. Create a [Fly.io](https://fly.io) account and install `flyctl`.
2. From the `backend/` directory, run:
   ```bash
   flyctl launch
   ```
3. Select at least **512 MB RAM** (1 GB recommended for model inference). Keep other defaults.
4. Add your `FLY_API_TOKEN` to GitHub Actions secrets at `https://github.com/<username>/<project>/settings/secrets/actions` for automatic deploys on push to `main`.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion |
| Backend | FastAPI, Pillow, NumPy |
| ML | PyTorch, TorchVision, npfl138 |
| Deployment | Vercel (frontend), Fly.io (backend via Docker) |

## License

MIT