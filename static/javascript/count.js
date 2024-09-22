function submitWorkout(event) {
    // Create an empty dictionary to store exercises and reps
    event.preventDefault();
    let workoutData = {};

    // Get all the input elements from the form
    const inputs = document.querySelectorAll('input[type="number"]');

    // Loop through inputs and build the workoutData dictionary
    inputs.forEach(input => {
        const exerciseName = input.getAttribute('name').replace('_reps', '');
        const reps = input.value;

        // Only add to the dictionary if the input has a value
        if (reps) {
            workoutData[exerciseName] = reps;
        }
    });
    console.log(workoutData)
    // Send a POST request with the workout data to /submitcount
    fetch('/submitcount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        //alert('Workout submitted successfully!');
        window.location.href = '/processVid';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}