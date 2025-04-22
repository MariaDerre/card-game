import { renderChooseLevelModal, appElement } from "../src/main";

export function loseRendor(appElement: HTMLElement, timeSpent: number) {
    const minutes = Math.floor(timeSpent / 60);
    const remainingSeconds = timeSpent % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    if (!appElement) {
        console.error("Элемент appEl не найден.");
        return;
    }
    const modalLoseHtml = `
        <div id="modal" class="modal">
            <div class="modal-content modal-content-win">
                <img class="img_win" src="dist/img/lose.png">
                <p class="text_win">Вы проиграли!</p>
                <p class="text_spendTime">Затраченное время:</p>
                <p class="spendTime">${formattedTime}</p>
                <button class="restart restart-again">Начать заново</button>
            </div>
        </div>
    `;
    appElement.innerHTML += modalLoseHtml;

    const restartBtn = document.querySelector(
        ".restart-again",
    ) as HTMLButtonElement;
    restartBtn.addEventListener("click", () => {
        if (appElement) {
            renderChooseLevelModal({ appEl: appElement });
        } else {
            console.error("Элемент с классом 'app' не найден.");
        }
    });
}
