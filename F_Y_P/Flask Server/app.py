from flask import Flask, render_template, request
import numpy as np
from tensorflow import keras
from keras.models import load_model
from PIL import Image
import os

app = Flask(__name__)
model = load_model('blood_group_model.h5')
class_labels = ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-']
UPLOAD_FOLDER = 'static/uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/')
def home():
    return render_template('index.html', result=None)


@app.route('/predict', methods=['POST'])
def predict():
    # Get form fields
    name = request.form['name']
    mobile = request.form['mobile']
    gender = request.form['gender']
    age = request.form['age']

    file = request.files['file']
    if file.filename == '':
        return "No file selected"
    filename = file.filename
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    # Preprocess fingerprint image
    img = Image.open(filepath).convert('RGB')
    img = img.resize((128, 128))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    confidence = float(np.max(predictions))
    predicted_class = np.argmax(predictions)
    blood_group = class_labels[predicted_class]

    result = {
        'name': name,
        'mobile': mobile,
        'gender': gender,
        'age': age,
        'image_path': '/' + filepath,  # Ensure proper URL
        'confidence': confidence,
        'prediction': blood_group
    }
    return render_template('index.html', result=result)


if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
