import { appElement, renderChooseLevelModal, selectedLevel } from "../src/main";
import { winRendor } from "./win";
import { loseRendor } from "./lose";

let firstCard: HTMLElement | null = null;
let secondCard: HTMLElement | null = null;
let lockBoard: boolean = false;
let seconds: number = 0;
let timer: NodeJS.Timeout;

function generateCards() {
    const suits: string[] = ["черви", "пики", "бубны", "крести"];
    const ranks: string[] = [
        "туз",
        "король",
        "дама",
        "валет",
        "10",
        "9",
        "8",
        "7",
        "6",
    ];
    const cards: string[] = [];

    suits.forEach((suit) => {
        ranks.forEach((rank) => {
            cards.push(`cards/${rank}%20${suit}.png`); // Создание пути к изображению
        });
    });
    return cards;
}

const cardsArray = generateCards();

export function renderPlayingFields() {
    if (!appElement) {
        console.error("Элемент appEl не найден.");
        return; // Выход из функции, если элемент не найден
    }
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
    const duplicatedCards: string[] = [...gameCards, ...gameCards]; // Дублируем карты для игры
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

    const restartBtn = document.querySelector(".restart") as HTMLButtonElement;
    const display = document.getElementById("display") as HTMLElement;

    startGame(duplicatedCards);
    startTimer();

    restartBtn.addEventListener("click", () => {
        if (appElement) {
            renderChooseLevelModal({ appEl: appElement });
        } else {
            console.error("Элемент с классом 'app' не найден.");
        }
    });

    const allCards = document.querySelectorAll(".card-inner");
    allCards.forEach((cardInner) => {
        cardInner.classList.remove("flipped");
    });

    setTimeout(() => {
        allCards.forEach((cardInner) => {
            cardInner.classList.add("flipped");
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

    function startGame(duplicatedCards: string[]): void {
        const gameFields = document.querySelector(".cards") as HTMLElement; // Получаем поле
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
    function shuffleArray<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function flipCard(event: MouseEvent): void {
        if (lockBoard) return;
        const clickedCard = event.currentTarget as HTMLElement;

        if (clickedCard === firstCard) return;

        clickedCard.querySelector(".card-inner")?.classList.remove("flipped");

        if (!firstCard) {
            firstCard = clickedCard;
            return;
        }

        secondCard = clickedCard;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch(): void {
        if (
            firstCard &&
            secondCard &&
            firstCard.dataset.value === secondCard.dataset.value
        ) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards(): void {
        firstCard?.querySelector(".card-inner")?.classList.remove("flipped");
        secondCard?.querySelector(".card-inner")?.classList.remove("flipped");
        if (firstCard) firstCard.removeEventListener("click", flipCard);
        if (secondCard) secondCard.removeEventListener("click", flipCard);
        setTimeout(() => {
            checkWin();
            resetBoard();
        }, 1000);
    }

    function unflipCards(): void {
        firstCard?.querySelector(".card-inner")?.classList.remove("flipped");
        secondCard?.querySelector(".card-inner")?.classList.remove("flipped");
        setTimeout(() => {
            firstCard?.querySelector(".card-inner")?.classList.add("flipped");
            secondCard?.querySelector(".card-inner")?.classList.add("flipped");
            clearInterval(timer);
            lockBoard = true;
            if (appElement) {
                loseRendor(appElement, seconds); // Теперь мы уверены, что appElement не null
            } else {
                console.error("Элемент с классом 'app' не найден.");
            }
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }
    function checkWin() {
        const flippedCards = document.querySelectorAll(".card-inner.flipped");
        if (flippedCards.length === 0) {
            clearInterval(timer);
            winRendor(seconds);
        }
    }
}
