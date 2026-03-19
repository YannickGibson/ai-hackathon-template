from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from PIL import Image, ImageOps
import io
import numpy as np
from typing import List
import torch
from argparse import Namespace
import torchvision.transforms as transforms
from npfl138.datasets.mnist import MNIST

from research.models import Model

from app.constants import WEIGHTS_PATH, MODEL_FILE


# Globals
to_tensor = transforms.ToTensor()
app = FastAPI()

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/predict")
async def predict(file: UploadFile):
    # Prepare data
    img = to_tensor(Image.open(file.file))
    mock_img = torch.randn(([1, MNIST.C, MNIST.H, MNIST.W]))

    # Load model from weights
    model = Model(Namespace())
    model.load_weights(f"{WEIGHTS_PATH}/{MODEL_FILE}")

    # Predict
    preds = model(mock_img, mock_img)

    # Display
    return dict(prediction=preds[0].item(), verdict=preds[0].item() > 0.5)


@app.post("/analyze")
async def analyze(file: UploadFile):
    img = Image.open(file.file)
    return {
        "format": img.format,
        "mode": img.mode,
        "width": img.width,
        "height": img.height,
    }


@app.post("/invert")
async def invert_image(file: UploadFile):
    """Load an image and return it with inverted colors"""
    # Load the image
    img = Image.open(file.file)

    # Convert to RGB if necessary
    if img.mode != "RGB":
        img = img.convert("RGB")

    # Invert the colors
    inverted_img = ImageOps.invert(img)

    # Save to bytes and return
    img_byte_arr = io.BytesIO()
    inverted_img.save(img_byte_arr, format="PNG")
    img_byte_arr.seek(0)

    return StreamingResponse(img_byte_arr, media_type="image/png")


@app.post("/blend")
async def blend_images(files: List[UploadFile]):
    """Take an array of images and return the averaged blend"""
    if len(files) < 2:
        return {"error": "At least 2 images required for blending"}

    images = []
    for file in files:
        img = Image.open(file.file)
        if img.mode != "RGB":
            img = img.convert("RGB")
        images.append(img)

    width, height = images[0].size

    for img in images:
        if img.size != (width, height):
            return {"error": "All images must have the same dimensions"}

    img_arrays = [np.array(img) for img in images]
    blended_array = np.mean(img_arrays, axis=0).astype(np.uint8)
    blended_img = Image.fromarray(blended_array)

    img_byte_arr = io.BytesIO()
    blended_img.save(img_byte_arr, format="PNG")
    img_byte_arr.seek(0)

    return StreamingResponse(img_byte_arr, media_type="image/png")
