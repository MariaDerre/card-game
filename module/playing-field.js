import { appElement, renderChooseLevelModal } from "../src/main.js";
import { cardsArray } from "./cardsArray.js";

let firstCard = null;
let secondCard = null;
let lockBoard = false;

export function renderPlayingFields(selectedLevel) {
    const cardArr = [];
    for (let i = 0; i < selectedLevel; i++) {
        cardArr.push(
            `<div class="card" data-value="${cardsArray[i % (selectedLevel / 2)]}" style="background-image: url(${cardsArray[i % (selectedLevel / 2)]});"></div>`,
        );
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

    function startGame(selectedLevel) {
        const selectedCard = cardsArray.slice(0, cardsArray.length / 2); //создаем массив из количества карт деленных на 2
        const gameCards = [...selectedCard, ...selectedCard]; //копируем массив
        shuffleArray(gameCards);

        const gameFields = document.querySelector(".cards"); //получаем поле
        gameFields.innerHTML = ""; //очищаем поле

        gameCards.forEach((value) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.value = value;
            card.style.backgroundImage = `url(${value})`; // Устанавливаем изображение
            card.addEventListener("click", flipCard);
            gameFields.appendChild(card);
        });

        // Показываем карточки 5 секунд, потом скрываем их
        setTimeout(() => {
            const allCards = document.querySelectorAll(".card");
            allCards.forEach((card) => {
                card.textContent = ""; // Показываем рубашки карточек
                card.classList.remove("flipped"); // Убираем класс переворота
            });
        }, 5000);
        flipCard();
    }
    //перемешиваем массив карт
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    function flipCard(event) {
        if (lockBoard) return; // Если доска заблокирована, ничего не делаем
        const clickedCard = event.target;

        if (clickedCard === firstCard) return; // Игрок не может щелкнуть по одной и той же карточке

        clickedCard.textContent = clickedCard.dataset.value; // Отображаем значение карточки
        clickedCard.classList.add("flipped"); // Добавляем класс для рендеринга

        if (!firstCard) {
            firstCard = clickedCard; // Запоминаем первую карточку
            return;
        }

        secondCard = clickedCard; // Запоминаем вторую карточку
        lockBoard = true; // Блокируем доску
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
