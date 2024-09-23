# IntelliFit: Your Personal Fitness Trainer

**IntelliFit** automates exercise tracking and guidance, ensuring users can focus on their workouts while receiving real-time feedback. The system uses advanced computer vision techniques to recognize exercises, count repetitions, analyze posture, and track progress.

![pushups-sample-out-ezgif com-optimize](https://github.com/user-attachments/assets/47cd3d88-b9eb-43c8-8fc1-068aace59706)

## Key Features

- **Exercise Recognition**: Automatically identifies exercises using 3D pose landmarks, ensuring proper form and technique throughout the workout.
- **Repetition Counter**: Tracks repetitions accurately using an enter-and-exit threshold system to prevent false rep counts.
- **Posture Analysis**: Provides real-time feedback on alignment and posture, helping reduce injury risks and improve performance.
- **Progress Tracking**: Offers detailed analytics on your workout, including the ability to review footage and pinpoint areas where posture may have faltered.
- **Seamless Exercise Switching**: Allows for smooth transitions between exercises during your workout.
- **Advanced Analysis Tools**: Analyze your workout with visualized data to identify areas for improvement.

## Architecture Overview

### FullBodyPoseEmbedder
The `FullBodyPoseEmbedder` class converts 3D pose landmarks into a 3D embedding for pose analysis or classification. It normalizes the input landmarks by adjusting for translation (centered around the hips) and scaling (based on torso size or maximum distance to the pose center). The embedding captures key spatial relationships between body parts.

### PoseClassifier
The `PoseClassifier` class classifies exercises based on pose landmarks. It loads pose samples, embeds them, and classifies new poses by comparing them to the stored samples. It also filters outliers and detects pose anomalies using nearest neighbor comparisons.

### EMADictSmoothing
The `EMADictSmoothing` class smooths pose classification data using Exponential Moving Average (EMA), reducing abrupt changes and providing more stable predictions over time.

### RepetitionCounter
The `RepetitionCounter` class counts repetitions for exercises by monitoring pose classification confidence. It uses a dual-threshold system to track when a user enters and exits a pose, ensuring reliable counting.

### PoseClassificationVisualizer
The `PoseClassificationVisualizer` class overlays exercise classification results, repetition counts, and posture deviations onto each frame of a video, offering real-time visual feedback.

### Bootstrap Helper
The `BootstrapHelper` class handles the initialization of the model by loading the training data, preparing the dataset, and setting up the necessary pre-requisites.

## How IntelliFit Works

1. **Initialization**: The model initializes exercise types and sets thresholds for detecting repetitions.
2. **Pose Landmarks**: Pose landmarks are extracted using MediaPipe, which are then drawn on the image frame.
3. **Exercise Processing**: The pose landmarks are embedded, classified, and smoothed using EMA, and reps are counted accurately using the enter-and-exit threshold method.
4. **Posture Visualization**: Ideal trainer landmarks are overlaid onto the user’s video frames, highlighting deviations from ideal posture.
5. **Analytics**: Frames with the highest confidence scores are stored for analysis, allowing users to review their posture and workout performance.

## Getting Started

### Prerequisites

You will need the following to run IntelliFit:
- Python 3.x
- MediaPipe
- OpenCV
- NumPy
- Flask (for the web interface)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YourRepo/IntelliFit.git
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
3. Run the application:
   ```bash
   Run the application:

## Future Work

- **Real-time Feedback**: Add real-time audio cues for posture correction during workouts.
- **Exercise Variety**: Extend exercise detection to include more workout types.
- **Posture Correction**: Implement AI-driven posture correction to improve user form.
- **Gait Analysis**: Add gait analysis for walking and running exercises, enhancing athletic training.
- **Voice Command**: The rep counter and other features gets activated through voice command
