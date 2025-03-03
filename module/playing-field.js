import { appElement, renderChooseLevelModal } from "../src/main.js";
import { cardsArray } from "./cardsArray.js";

export function renderPlayingFields(selectedLevel) {
    let level = selectedLevel;
    const cardArr = [];
    for (let i = 0; i < level; i++) {
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

    function startGame(level) {
        const selectedCard = cardsArray.slice(0, cardsArray / 2); //создаем массив из количества карт деленных на 2
        const gameCards = [...selectedCard, ...selectedCard]; //копируем массив
        shuffleArray(gameCards);

        const gameFields = document.querySelector(".cards"); //получаем поле
        gameFields.innerHTML = ""; //очищаем поле
    }

    //перемешиваем массив карт
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

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
