const video = document.getElementById('webcam');
window.onload = function() {
    // Hide loading screen after 5 seconds
    const videoElement = document.getElementById('workoutVideo');
    videoElement.pause()
    setTimeout(function() {
        document.getElementById('loadingScreen').style.display = 'none'; // Hide loading screen
        document.getElementById('contentContainer').classList.remove('hidden'); // Show the content
        videoElement.play()
    }, 5000); // 5-second delay
    
}
const videoElement = document.getElementById('workoutVideo');
const card=document.getElementById('card')
videoElement.onended=function(e){
    card.style.display='block'
}
// Check if the browser supports getUserMedia
// if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//     // Request access to the webcam
//     navigator.mediaDevices.getUserMedia({ video: true })
//         .then(function(stream) {
//             // Set the video stream to the video element
//             video.srcObject = stream;
//         })
//         .catch(function(error) {
//             console.error("Error accessing the webcam:", error);
//             alert("Unable to access the webcam.");
//         });
// } else {
//     alert("getUserMedia not supported by your browser.");
// }