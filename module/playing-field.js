import {
    appElement,
    renderChooseLevelModal,
    selectedLevel,
} from "../src/main.js";
import { winRendor } from "../module/win.js";

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let seconds = 0;
let timer;

function generateCards() {
    const suits = ["пики", "червы", "бубны", "трефы"]; // Масти
    const ranks = ["туз", "2", "3", "4", "5", "6", "7", "дама", "король"]; // Ранги
    const cards = [];

    suits.forEach((suit) => {
        ranks.forEach((rank) => {
            cards.push(`img/cards/${rank} ${suit}.png`); // Создание пути к изображению
        });
    });

    return cards;
}
const cardsArray = generateCards();
export function renderPlayingFields() {
    const cardArr = [];
    let numCards;

    switch (selectedLevel) {
        case 1:
            numCards = 6;
            break;
        case 2:
            numCards = 12;
            break;
        case 3:
            numCards = 18;
            break;
        default:
            numCards = 0;
            break;
    }

    const gameCards = [
        ...cardsArray.slice(0, numCards / 2),
        ...cardsArray.slice(0, numCards / 2),
    ];
    shuffleArray(gameCards); // Перемешивание карт

    gameCards.forEach((value) => {
        cardArr.push(
            `<div class="card" data-value="${value}" style="background-image: url('../cards/shirt.png');"></div>`,
        );
    });

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

    const restartBtn = document.querySelector(".restart");
    const display = document.getElementById("display");

    startGame();
    startTimer();

    restartBtn.addEventListener("click", () => {
        renderChooseLevelModal({ appEl: appElement });
    });

    // Показываем карточки 5 секунд, потом скрываем их
    setTimeout(() => {
        const allCards = document.querySelectorAll(".card");
        allCards.forEach((card) => {
            card.style.backgroundImage = ""; // Скрываем изображение
            card.classList.remove("flipped"); // Убираем класс переворота
        });
    }, 5000);

    function startTimer() {
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

    function startGame() {
        const gameFields = document.querySelector(".cards"); // Получаем поле
        gameFields.innerHTML = ""; // Очищаем поле

        gameCards.forEach((value) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.value = value; // Исправлено: теперь dataset.value это путь к изображению
            card.style.backgroundImage = `url("../cards/shirt.png")`; // Устанавливаем рубашку изображения
            card.addEventListener("click", flipCard);
            gameFields.appendChild(card);
        });
    }
    //перемешиваем массив карт
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function flipCard(event) {
        if (lockBoard) return;
        if (!event.target.classList.contains("card")) return; // Проверяем, что кликнули именно по карточке
        const clickedCard = event.target;
        if (clickedCard === firstCard) return;

        clickedCard.classList.add("flipped");
        clickedCard.style.backgroundImage = `url(${clickedCard.dataset.value})`; // Показываем изображение

        if (!firstCard) {
            firstCard = clickedCard;
            return;
        }

        secondCard = clickedCard;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        if (firstCard.dataset.value === secondCard.dataset.value) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);

        resetBoard();
        checkWin(); // Проверяем, выиграл ли игрок
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.style.backgroundImage = `url("../cards/shirt.png")`; // Скрываем изображение
            secondCard.style.backgroundImage = `url("../cards/shirt.png")`; // Скрываем изображение
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }
    function checkWin() {
        const flippedCards = document.querySelectorAll(".card.flipped");
        if (flippedCards.length === selectedLevel) {
            clearInterval(timer); // Останавливаем таймер
            winRendor();
            resetGame();
        }
    }
    function resetGame() {
        clearInterval(timer);
        seconds = 0;
        updateDisplay();
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        startGame();
        startTimer();
    }
}
