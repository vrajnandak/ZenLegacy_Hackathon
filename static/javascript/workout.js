const video = document.getElementById('webcam');

// Check if the browser supports getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Request access to the webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            // Set the video stream to the video element
            video.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Error accessing the webcam:", error);
            alert("Unable to access the webcam.");
        });
} else {
    alert("getUserMedia not supported by your browser.");
}