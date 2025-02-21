import { appElement, renderChooseLevelModal } from "../main.js";

export function renderLevel () {
    const level = `
    <div class='header'>
        <div class="stopwatch">
            <div class="time_text">
                <span class="label">min</span>
                <span class="label">sek</span>
            </div>
            <div class="display" id="display">00:00</div>
        </div>
        <button class='restart'>Начать заново</button>
    </div>
    `

appElement.innerHTML = level;

let timer;
let seconds = 0;
let isRunning = true; // Начинаем с запущенного состояния

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener('click', () => {
    renderChooseLevelModal({ appEl: appElement })
}) 

const display = document.getElementById('display');

startTimer();

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
