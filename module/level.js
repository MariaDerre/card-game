export function renderLevel () {
    const levelOne = `
    <div class="stopwatch">
        <div class="display" id="display">00:00</div>
        <div class="labels">
            <span class="label">мин</span>
            <span class="label">сек</span>
        </div>
    </div>
    `
let timer;
let seconds = 0;
let isRunning = true; // Начинаем с запущенного состояния

const display = document.getElementById('display');

// Запускаем таймер автоматически при загрузке страницы
window.onload = () => {
    startTimer();
};

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        updateDisplay();
    }, 1000);
}
function updateDisplay() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    display.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}    
}
