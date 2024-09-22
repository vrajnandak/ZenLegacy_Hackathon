let selectedExercises = [];

function toggleTick(element) {
    const tick = element.querySelector('.tick');
    const img = element.querySelector('img');
    const exercise = element.getAttribute('data-exercise');
    const button=document.querySelector('.button')
    
    if (tick.style.display === 'none') {
        tick.style.display = 'block';
        
        selectedExercises.push(exercise); // Add exercise to the list
    } else {
        tick.style.display = 'none';
       
        selectedExercises = selectedExercises.filter(item => item !== exercise); // Remove exercise from the list
    }
    if(selectedExercises.length==0){
        button.style.display= 'none'
    }
    if(selectedExercises.length>0){
        button.style.display='block'
    }
}

function submitExercises() {
    fetch('/submit-exercises', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ exercises: selectedExercises })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        
        window.location.href = '/exerciseCount';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
