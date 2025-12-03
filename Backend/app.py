from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_pymongo import PyMongo
import uuid
from datetime import datetime
from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import os
import google.genai as genai
from dotenv import load_dotenv
from io import BytesIO
from werkzeug.utils import secure_filename

# Load environment variables
load_dotenv(".env")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# --- 1. Environment Configuration ---
UPLOAD_FOLDER = os.environ.get("UPLOAD_FOLDER")
FILE_SERVER_BASE_URL = os.environ.get("FILE_SERVER_BASE_URL")

# --- 2. Flask & Mongo Setup ---
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/analysis_history_db"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
mongo = PyMongo(app)

# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    try:
        os.makedirs(UPLOAD_FOLDER)
        print(f"Created upload directory: {UPLOAD_FOLDER}")
    except OSError as e:
        print(f"Error creating upload directory: {e}")

# --- 3. Gemini Client ---
if not GEMINI_API_KEY:
    print("Warning: GEMINI_API_KEY not set. Gemini calls will fail.")
    genai_client = None
else:
    genai_client = genai.Client(api_key=GEMINI_API_KEY)

# --- Load Keras Model ---
try:
    model = load_model("./Keras model/personality_model.h5", compile=False)
    class_names = open("./Keras model/labels.txt", "r").readlines()
except Exception as e:
    print(f"ERROR loading Keras model: {e}")
    model = None
    class_names = []

# --- CORS ---
CORS(app, resources={
    r"/api/ocr-recognize": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173", "http://192.168.29.178:5173"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True
    },
    r"/upload_and_analyze": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173", "http://192.168.29.178:5173"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": True
    }
})

# --- Helper ---
def get_unique_filename(filename):
    """Generates a UUID-based safe filename."""
    cleaned_name = secure_filename(filename)
    return f"{uuid.uuid4()}_{cleaned_name}"

# --- 4. Combined Upload & Analyze Route ---
@app.route('/upload_and_analyze', methods=['POST'])
def upload_and_analyze_and_log():
    file = request.files.get('image')

    if not file:
        return jsonify({'error': 'No image uploaded'}), 400

    if not UPLOAD_FOLDER:
        return jsonify({'error': 'UPLOAD_FOLDER is not configured'}), 500

    try:
        file_bytes = file.read()
        image = Image.open(BytesIO(file_bytes)).convert("RGB")
    except Exception as e:
        return jsonify({'error': f"Error opening image: {e}"}), 500

    unique_filename = get_unique_filename(file.filename)

    try:
        # Save file locally
        save_path = os.path.join(app.config["UPLOAD_FOLDER"], unique_filename)
        with open(save_path, "wb") as f:
            f.write(file_bytes)

        image_url = f"{FILE_SERVER_BASE_URL}{unique_filename}"

        # Keras prediction
        resized = ImageOps.fit(image, (224, 224), Image.Resampling.LANCZOS)
        arr = np.asarray(resized)
        normalized = (arr.astype(np.float32) / 127.5) - 1
        data = np.ndarray((1, 224, 224, 3), dtype=np.float32)
        data[0] = normalized

        prediction = model.predict(data)
        index = np.argmax(prediction)
        class_name = class_names[index].strip()
        confidence = float(prediction[0][index])

        descriptions = {
            "Openness": "Imaginative and curious personality.",
            "Conscientiousness": "Organized and disciplined personality.",
            "Extraversion": "Energetic and outgoing personality.",
            "Agreeableness": "Cooperative and compassionate personality.",
            "Neuroticism": "Prone to emotional instability."
        }
        personality_description = descriptions.get(class_name, f"Trait: {class_name}")

        # Gemini Interpretation
        try:
            if not genai_client:
                defect_description = "Gemini API key missing."
            else:
                response = genai_client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=[image, "Describe handwriting personality in one line."]
                )
                defect_description = response.text.strip()
        except Exception as e:
            defect_description = f"Gemini error: {e}"

        # Save to MongoDB
        mongo.db.analysis_history.insert_one({
            "original_filename": file.filename,
            "local_filename": unique_filename,
            "image_url": image_url,
            "analysis_time": datetime.utcnow(),
            "user_session": request.remote_addr,
            "keras_class": class_name,
            "keras_confidence": confidence,
            "gemini_caption": defect_description
        })

        return jsonify({
            "class": class_name,
            "confidence": confidence,
            "personality_description": personality_description,
            "defect_description": defect_description,
            "image_url": image_url,
            "message": "Analysis complete."
        })

    except Exception as e:
        print(f"Server error: {e}")
        return jsonify({"error": f"Unexpected server error: {e}"}), 500

# --- File Serving ---
@app.route('/uploads/<filename>')
def serve_uploads(filename):
    try:
        return send_from_directory(app.config["UPLOAD_FOLDER"], filename)
    except FileNotFoundError:
        return "File not found", 404

# --- OCR Route ---
@app.route('/api/ocr-recognize', methods=['POST'])
def ocr_recognize():
    if 'handwriting_image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    if not genai_client:
        return jsonify({'error': 'GEMINI_API_KEY missing'}), 500

    file = request.files['handwriting_image']

    try:
        image = Image.open(BytesIO(file.read()))
        prompt = "Extract the text from this image. Only return the raw text."

        response = genai_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[image, prompt]
        )

        recognized_text = response.text.strip()
        if not recognized_text:
            recognized_text = "No recognizable text found."

        return jsonify({"recognized_text": recognized_text, "status": "success"})

    except Exception as e:
        return jsonify({'error': f"OCR failed: {e}"}), 500

# --- Preflight ---
@app.route('/caption', methods=['OPTIONS'])
def handle_options():
    response = jsonify({'message': 'OK'})
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "POST")
    return response

if __name__ == '__main__':
    app.run(debug=True)