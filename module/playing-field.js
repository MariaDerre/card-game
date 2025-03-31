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
    const suits = ["черви", "пики", "бубны", "крести"];
    const ranks = ["туз", "король", "дама", "валет", "10", "9", "8", "7", "6"];
    const cards = [];

    suits.forEach((suit) => {
        ranks.forEach((rank) => {
            cards.push(`cards/${rank}%20${suit}.png`); // Создание пути к изображению
        });
    });
    return cards;
}

const cardsArray = generateCards();

export function renderPlayingFields() {
    let numCards;

    switch (selectedLevel) {
        case "1":
            numCards = 6;
            break;
        case "2":
            numCards = 12;
            break;
        case "3":
            numCards = 18;
            break;
        default:
            numCards = 0;
            break;
    }

    const gameCards = shuffleArray([...cardsArray]).slice(0, numCards);
    const duplicatedCards = [...gameCards, ...gameCards]; // Дублируем карты для игры
    shuffleArray(duplicatedCards); // Перемешиваем дублированные карты

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
         ${duplicatedCards
             .map(
                 (card) => `
                <div class="card" data-value="${card}">
                    <div class="card-inner">
                        <div class="card-front" style="background-image: url(${card});"></div>
                        <div class="card-back" style="background-image: url('../cards/shirt.png');"></div>
                    </div>
                </div>
            `,
             )
             .join("")}
        </div>
        `;
    appElement.innerHTML = appHtml;

    const restartBtn = document.querySelector(".restart");
    const display = document.getElementById("display");

    startGame(duplicatedCards);
    startTimer();

    restartBtn.addEventListener("click", () => {
        renderChooseLevelModal({ appEl: appElement });
    });

    // Сначала показываем лицевые стороны
    const allCards = document.querySelectorAll(".card-inner");
    allCards.forEach((cardInner) => {
        cardInner.classList.remove("flipped"); // Убираем класс переворота
    });

    // Ждем 5 секунд и переворачиваем карты
    setTimeout(() => {
        allCards.forEach((cardInner) => {
            cardInner.classList.add("flipped"); // Добавляем класс для переворота
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

        duplicatedCards.forEach((value) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.value = value;

            const cardInner = document.createElement("div");
            cardInner.classList.add("card-inner");
            const cardFront = document.createElement("div");
            cardFront.classList.add("card-front");
            cardFront.style.backgroundImage = `url(${value})`;
            const cardBack = document.createElement("div");
            cardBack.classList.add("card-back");

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);

            card.addEventListener("click", flipCard);
            gameFields.appendChild(card);
        });
    }
    //перемешиваем массив карт
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Генерируем случайный индекс
            [array[i], array[j]] = [array[j], array[i]]; // Меняем местами элементы
        }
        return array;
    }

    function flipCard(event) {
        if (lockBoard) return;
        const clickedCard = event.currentTarget;

        if (clickedCard === firstCard) return;

        clickedCard.querySelector(".card-inner").classList.add("flipped");

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
            firstCard.querySelector(".card-inner").classList.remove("flipped");
            secondCard.querySelector(".card-inner").classList.remove("flipped");
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }
    function checkWin() {
        const flippedCards = document.querySelectorAll(".card.flipped");
        if (flippedCards.length === selectedLevel * 2) {
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
