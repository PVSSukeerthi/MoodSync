from flask import Flask, render_template, request, jsonify
import cv2
from deepface import DeepFace
from collections import Counter
import os

app = Flask(__name__)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
emotions_list = []

def map_emotion(emotion):
    """Map detailed emotions to broader categories."""
    if emotion == 'angry':
        return 'exclude'  
    elif emotion in ['disgust', 'fear']:
        return 'stress'
    elif emotion in ['happy', 'surprise']:
        return 'happy'
    elif emotion in ['sad']:
        return 'sad'
    elif emotion == 'neutral':
        return 'neutral'
    else:
        return 'unknown'  


@app.route('/')
def index():
    """
    Render the homepage with the camera preview and button.
    """
    return render_template('index.html')

@app.route('/process-frame', methods=['POST'])
def process_frame():
    """
    Receive a frame from the client, process it for emotions, map them, and store the results.
    """
    global emotions_list

    
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Empty file name'}), 400

   
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    try:
        
        frame = cv2.imread(file_path)
        faces = face_cascade.detectMultiScale(frame, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        
        for (x, y, w, h) in faces:
            face_roi = frame[y:y+h, x:x+w]
            result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)
            dominant_emotion = result[0]['dominant_emotion']

            
            categorized_emotion = map_emotion(dominant_emotion)


            if categorized_emotion not in ['unknown', 'exclude']:
                emotions_list.append(categorized_emotion)

        os.remove(file_path)  
        return jsonify({'message': 'Frame processed successfully'})
    except Exception as e:
        os.remove(file_path)
        return jsonify({'error': str(e)}), 500
@app.route('/clear-emotions', methods=['POST'])
def clear_emotions():
    """
    Clear the list of detected emotions to start a new session.
    """
    global emotions_list
    emotions_list = []
    return jsonify({'message': 'Emotions cleared successfully'})

@app.route('/get-emotions', methods=['GET'])
def get_emotions():
    """
    Return the top emotions detected so far.
    """
    global emotions_list

    if not emotions_list:
        return jsonify({'error': 'No emotions detected yet'}), 200

    
    emotion_counts = Counter(emotions_list)
    total_emotions = sum(emotion_counts.values())
    top_emotions = emotion_counts.most_common(3)
    emotions_result = [
        {
            'emotion': emotion,
            'count': count,
            'percentage': f"{(count / total_emotions) * 100:.2f}%"
        }
        for emotion, count in top_emotions
    ]

    return jsonify({'emotions': emotions_result})

if __name__ == '__main__':
    os.makedirs('uploads', exist_ok=True)
    app.run(debug=True)
