// ===============================================
// Seleksi Elemen & Inisialisasi Variabel
// ===============================================
const timeDisplay = document.getElementById("time");
const pomodoroBtn = document.getElementById("pomodoro-btn");
const shortBreakBtn = document.getElementById("short-break-btn");
const longBreakBtn = document.getElementById("long-break-btn");
const startPauseBtn = document.getElementById("start-pause-btn");
const startPauseText = document.getElementById("start-pause-text");
const restartBtn = document.getElementById("restart-btn");
let iconStart = document.getElementById("icon-start");

let timePomo = 25;
let timeShort = 0.1;
let timeLong = 15;

const DURATION = {
  pomodoro: timePomo * 60,
  "short-break": timeShort * 60,
  "long-break": timeLong * 60,
};

let timerInterval = null;
let timeLeft = DURATION.pomodoro;
let currentMode = "pomodoro";
let isRunning = false;

// ===============================================
// Fungsi-Fungsi Kunci
// ===============================================

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

  }

  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
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
  updateDisplay();
}

// ===============================================
// Event Listeners
// ===============================================
pomodoroBtn.addEventListener("click", () => switchMode("pomodoro"));
shortBreakBtn.addEventListener("click", () => switchMode("short-break"));
longBreakBtn.addEventListener("click", () => switchMode("long-break"));

startPauseBtn.addEventListener("click", toggleStartPause);
restartBtn.addEventListener("click", restartTimer);

// Inisialisasi tampilan saat halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
  switchMode("pomodoro");
});
