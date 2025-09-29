const timeDisplay = document.getElementById("time");
const pomodoroBtn = document.getElementById("pomodoro-btn");
const shortBreakBtn = document.getElementById("short-break-btn");
const longBreakBtn = document.getElementById("long-break-btn");
const startPauseBtn = document.getElementById("start-pause-btn");
const startPauseText = document.getElementById("start-pause-text");
const restartBtn = document.getElementById("restart-btn");
const containerTime = document.querySelector("#container-time");
const saveBtn = document.querySelector("#save-button");
let iconStart = document.getElementById("icon-start");
const settingsModal = document.querySelector("#settings-modal");
const alarmSound = new Audio("./src/sounds/alarm.mp3");

let timePomo = 25;
let timeShort = 0.1;
let timeLong = 15;

let DURATION = {
  pomodoro: timePomo * 60,
  "short-break": timeShort * 60,
  "long-break": timeLong * 60,
};

function getTime() {
  timePomo = parseInt(document.querySelector("#pomodoro-input").value);
  timeShort = parseInt(document.querySelector("#short-break-input").value);
  timeLong = parseInt(document.querySelector("#long-break-input").value);

  DURATION = {
    pomodoro: timePomo * 60,
    "short-break": timeShort * 60,
    "long-break": timeLong * 60,
  };

  restartTimer();
}

let timerInterval = null;
let timeLeft = DURATION.pomodoro;
let currentMode = "pomodoro";
let isRunning = false;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(timeLeft);
  document.title = `${formatTime(timeLeft)} - Pomodoro`;
}

function switchMode(mode) {
  currentMode = mode;
  pauseTimer();
  timeLeft = DURATION[mode];
  updateDisplay();

  // Logika UI: Buat tombol tidak aktif menjadi redup
  pomodoroBtn.classList.add("opacity-50");
  shortBreakBtn.classList.add("opacity-50");
  longBreakBtn.classList.add("opacity-50");
  document.querySelector(`#${mode}-btn`).classList.remove("opacity-50");
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  if (startPauseText) startPauseText.textContent = "Pause";
  if (isRunning) {
    iconStart.innerHTML = `<svg id="icon-start"xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16">
  <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5"/>
</svg>`;
    containerTime.classList.remove(
      "shadow-[12px_11px_10px_1px_rgba(0,173,181,1)]"
    );
    containerTime.classList.add("shadow-[12px_11px_10px_1px_rgba(145,8,31,1)]");
  }

  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alarmSound.play();
      alert(`${currentMode} session has finished!`);
      restartTimer();
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  if (startPauseText) startPauseText.textContent = "Start";
  if (startPauseText) {
    iconStart.innerHTML = "";
    iconStart.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
      </svg>`;
    containerTime.classList.remove(
      "shadow-[12px_11px_10px_1px_rgba(145,8,31,1)]"
    );
    containerTime.classList.add(
      "shadow-[12px_11px_10px_1px_rgba(0,173,181,1)]"
    );
  }
  clearInterval(timerInterval);
}

function toggleStartPause() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function restartTimer() {
  pauseTimer();
  timeLeft = DURATION[currentMode];
  pauseTimer();
  updateDisplay();
}

pomodoroBtn.addEventListener("click", () => switchMode("pomodoro"));
shortBreakBtn.addEventListener("click", () => switchMode("short-break"));
longBreakBtn.addEventListener("click", () => switchMode("long-break"));

startPauseBtn.addEventListener("click", toggleStartPause);
restartBtn.addEventListener("click", restartTimer);
saveBtn.addEventListener("click", getTime);

// Inisialisasi tampilan saat halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
  switchMode("pomodoro");
});
