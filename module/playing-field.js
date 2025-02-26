import {
    appElement,
    renderChooseLevelModal,
    selectedLevel,
} from "../src/main.js";

export function renderPlayingFields() {
    let level = selectedLevel.value;
    const cardArr = [];
    for (let i = 0; i < 36; i++) {
        cardArr.push(`<div class="card"></div>`);
    }
    const appHtml = `
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
        <div class="cards">
        ${cardArr.join(" ")}
        </div>
        `;
    appElement.innerHTML = appHtml;

    let seconds = 0;

    const restartBtn = document.querySelector(".restart");
    restartBtn.addEventListener("click", () => {
        renderChooseLevelModal({ appEl: appElement });
    });

    const display = document.getElementById("display");

    startTimer();

    function startTimer() {
        let timer;
        timer = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
    }
    function updateDisplay() {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        display.textContent = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    }
}
