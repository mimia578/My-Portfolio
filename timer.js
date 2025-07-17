let time = 0;
let intervalId = null; //stores the id of the timer so that i can start and stop the built in interval functions 

const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start")
const stopButton = document.getElementById("stop")
const resetButton = document.getElementById("reset")

// Update the timer display
function updateDisplay() {
  timeDisplay.textContent = `${time}s`;
}

// Start the stopwatch, 
function startTimer() {
  if (intervalId === null && time < 30) {
    intervalId = setInterval(() => {
      time += 1;
      if (time%3==0){
        updateDisplay();
      }
      

      if (time >= 30) {
        stopTimer(); // Automatically stop at 30s
      }
    }, 1000); // Every 3 seconds
  }
}

//Stop the stopwatch by clearing the set interval loop i have started 
function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

// Reset the stopwatch
function resetTimer() {
  stopTimer();
  time = 0;
  updateDisplay();
}

// Attach event listeners
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

// Initialize
updateDisplay();
