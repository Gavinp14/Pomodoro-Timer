const WORK_DURATION = 1500; 
const SHORT_BREAK_DURATION = 300; 
const LONG_BREAK_DURATION = 1800; 
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");;
const pauseButton = document.getElementById("pauseButton");
const timerDisplay = document.getElementById("timer");
const alarm = new Audio('clock-alarm-8761.mp3')

let timer;
let running = false;
let currentDuration = WORK_DURATION;
let cycleCount = 1;
let id = "Work";

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    resetButton.style.display = 'inline-block';
    highlightElement(id);
    startTimer();
});

pauseButton.addEventListener('click', () => {
    if(running){
        clearInterval(timer);
        pauseButton.innerHTML = 'Resume';
        running = false;
    }
    else{
        startTimer();
        pauseButton.innerHTML = 'Pause';
        running = true;
    }
});

resetButton.addEventListener('click', () => {
    removeHighlight("Work");
    removeHighlight("Short Break");
    removeHighlight("Long Break");
    pauseButton.style.display = 'none';
    resetButton.style.display = 'none';
    startButton.style.display = 'inline-block';
    clearInterval(timer);
    id = "Work";
    currentDuration = WORK_DURATION;
    timerDisplay.innerHTML = "25:00";
});


function displayTimer() {
    const minutes = Math.floor(currentDuration / 60);
    const seconds = currentDuration % 60;
    timerDisplay.innerHTML = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    timer = setInterval(function () {
        if (currentDuration > 0) {
            currentDuration--;
            displayTimer();
        } else {
            clearInterval(timer);
            if (id == "Work") {
                if (cycleCount == 4) {
                    currentDuration = LONG_BREAK_DURATION;
                    id = "Long Break";
                    cycleCount = 0;
                } else {
                    currentDuration = SHORT_BREAK_DURATION;
                    id = "Short Break";
                }
            } else if (id == "Short Break" || id == "Long Break") {
                currentDuration = WORK_DURATION;
                id = "Work";
                cycleCount++;
                highlightElement(id);
                alarm.play();
            }

            removeHighlight("Work");
            removeHighlight("Short Break");
            removeHighlight("Long Break");

            highlightElement(id);
            alarm.play();

            startTimer();
        }
    }, 1000);
    running = true;
}

function highlightElement(id) {
    const element = document.getElementById(id);
    element.classList.add("highlight");
}

function removeHighlight(id) {
    const element = document.getElementById(id);
    element.classList.remove("highlight");
}