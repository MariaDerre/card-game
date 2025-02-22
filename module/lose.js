import { renderChooseLevelModal } from "../main.js";

export function loseRendor() {
    const modalLoseHtml = `
        <div id="modal" class="modal">
            <div class="modal-content modal-content-win">
                <img class='img_win' src="">
                <p class="text_win">Вы проиграли!</p>
                <p class="text_spendTime">Затраченное время:</p>
                <p class="spendTime">time</p>
                <button class="restart restart-again">Начать заново</button>
            </div>
        </div>
    `;

    const restartBtn = document.querySelector(".restart");
    restartBtn.addEventListener("click", () => {
        renderChooseLevelModal({ appEl: appElement });
    });
}
