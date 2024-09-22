from flask import Flask, render_template, request, jsonify, session, redirect,url_for,send_file
import os
import numpy as np
import pickle
import time
import tqdm
import cv2
import threading
from create_video_module import create_video
from mediapipe.python.solutions import drawing_utils as mp_drawing

app = Flask(__name__)
app.config['processed_vid_folder'] = 'processedVid/'
app.secret_key = "your_secret_key"  # Needed for session management
app.config['UPLOAD_FOLDER'] = 'uploads/'  # Set the folder for uploaded files
app.config['MAX_CONTENT_LENGTH'] = 30 * 1024 * 1024  # Limit the size to 16 MB
@app.route("/")
def home():
    return render_template('home.html')

@app.route("/submit-exercises", methods=["POST"])
def submit_exercises():
    data = request.json
    selected_exercises = data.get('exercises', [])
    session['selected_exercises'] = selected_exercises  # Store exercises in the session
    print("Selected exercises:", selected_exercises)
    return jsonify({"status": "success", "exercises": selected_exercises})

@app.route('/exerciseCount')
def countExercise():
    selected_exercises = session.get('selected_exercises', [])  # Retrieve exercises from session
    return render_template('count.html', content=selected_exercises)
@app.route('/submitcount',methods=["POST"])
def submitCount():
    # Get the JSON data from the request
    data = request.json
    
    # Log or process the workout data (e.g., save to database or file)
    
    session["exerciseCount"]=data
    print("Received workout data: by shreyank ", session["exerciseCount"])
    
    # Here you can perform additional operations with the data, like saving it
    
    # Send a success response back to the client
    return jsonify({"status": "success", "message": "Workout data received", "data": data})

@app.route('/startWorkout',methods=["GET","POST"])
def startWorkout():
    if request.method == "POST":
        # Check if the POST request has the file part
        if 'videoFile' not in request.files:
            return jsonify({"status": "error", "message": "No file part"})
        
        file = request.files['videoFile']

        # If the user does not select a file
        if file.filename == '':
            return jsonify({"status": "error", "message": "No selected file"})

        # Save the file if it is a valid video file
        if file and file.filename.endswith(('mp4', 'avi', 'mov', 'mkv')):
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filepath)

            return redirect(url_for('processVid'))

        
        return jsonify({"status": "error", "message": "Invalid file format"})

    return render_template('workout.html')
@app.route('/processVid',methods=["GET"])
def processVid():
    
    content=session["exerciseCount"]
    for exercise , count in content.items():
        content[exercise]=int(content[exercise])
    exerciseDone={'PUSHUP':3,'LATERAL RISE':6,'LEG EXTENSION':3}
    
    return render_template('workout.html',content=content,exerciseDone=exerciseDone)

        
        

   # return send_file(output_video_file_path,as_attathment=True)

if __name__ == "__main__":
    app.run(debug=True)
