import os
from flask import Flask, request, jsonify, send_file
from PIL import Image, ImageDraw, ImageFont

app = Flask(__name__)

# Define a folder to store temporary images
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Check if the upload folder exists; if not, create it
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def index():
    return "Welcome to the Image Editor"

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        # Save the uploaded image to the uploads folder
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], 'uploaded_image.png'))
        return jsonify({'message': 'Image uploaded successfully'})

@app.route('/resize', methods=['POST'])
def resize_image():
    # Open the uploaded image
    uploaded_image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'uploaded_image.png')
    image = Image.open(uploaded_image_path)

    # Resize the image to 1:1 ratio
    size = min(image.width, image.height)
    image = image.crop((0, 0, size, size))

    # Save the resized image
    resized_image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'resized_image.png')
    image.save(resized_image_path)

    return jsonify({'message': 'Image resized successfully'})

@app.route('/add_frame', methods=['POST'])
def add_frame():
    # Open the resized image
    resized_image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'resized_image.png')
    image = Image.open(resized_image_path)

    # Open the frame image (replace with the correct path)
    frame_image_path = 'AFframe0.png'

    if not os.path.exists(frame_image_path):
        return jsonify({'error': 'Frame image not found'})

    frame = Image.open(frame_image_path)

    # Paste the frame image onto the resized image
    image.paste(frame, (0, 0), frame)

    # Save the image with the frame
    image_with_frame_path = os.path.join(app.config['UPLOAD_FOLDER'], 'image_with_frame.png')
    image.save(image_with_frame_path)

    return jsonify({'message': 'Frame added successfully'})

@app.route('/add_text', methods=['POST'])
def add_text():
    text = request.form.get('text')
    if not text:
        return jsonify({'error': 'Text not provided'})

    # Open the image with the frame
    image_with_frame_path = os.path.join(app.config['UPLOAD_FOLDER'], 'image_with_frame.png')
    image = Image.open(image_with_frame_path)

    # Add text to the image
    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()
    draw.text((20, 40), text, fill='white', font=font)

    # Save the image with added text
    final_image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'final_image.png')
    image.save(final_image_path)

    return jsonify({'message': 'Text added successfully'})

@app.route('/download', methods=['GET'])
def download_image():
    final_image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'final_image.png')
    return send_file(final_image_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
