let timerInterval;
let elapsedTime = 0;
let running = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startPause() {
    if (!running) {
        running = true;
        startPauseBtn.textContent = 'Pause';
        timerInterval = setInterval(() => {
            elapsedTime += 10;
            updateDisplay();
        }, 10);
    } else {
        running = false;
        startPauseBtn.textContent = 'Start';
        clearInterval(timerInterval);
    }
}

function reset() {
    running = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    startPauseBtn.textContent = 'Start';
    lapsList.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.textContent = formatTime(elapsedTime);
        lapsList.appendChild(lapTime);
    }
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

updateDisplay();