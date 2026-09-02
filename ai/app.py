from fastapi import FastAPI, UploadFile, File
from PIL import Image
from transformers import pipeline

app = FastAPI()

# Load plant disease model
classifier = pipeline(
    "image-classification",
    model="kimcomehome/plantvillage-vit-leaf-disease"
)

# Disease recommendations
recommendations = {
    "Potato___Early_blight": "Remove affected leaves, maintain good airflow, avoid overhead watering, and follow locally recommended fungicide guidance.",
    "Potato___Late_blight": "Remove infected plant material, avoid overhead irrigation, and follow locally recommended fungicide guidance.",
    "Tomato___Early_blight": "Remove affected leaves, improve airflow, avoid wetting leaves, and follow locally recommended treatment guidance.",
    "Tomato___Late_blight": "Remove severely affected plant material and follow locally recommended disease-control guidance."
}


@app.get("/")
def home():
    return {"message": "Digital Kisan Mitra AI is working!"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    image = Image.open(file.file).convert("RGB")

    results = classifier(image)
    prediction = results[0]

    disease = prediction["label"]
    confidence = round(prediction["score"] * 100, 2)

    recommendation = recommendations.get(
        disease,
        "Please consult a local agriculture expert for the appropriate treatment."
    )

    return {
        "filename": file.filename,
        "disease": disease,
        "confidence": confidence,
        "recommendation": recommendation
    }