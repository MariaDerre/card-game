import { renderPlayingFields } from "../module/playing-field";
import "./style.css";

export const appElement: HTMLElement | null = document.querySelector(".app");


export let selectedLevel: string | null;
interface RenderChooseLevelModalProps {
    appEl: HTMLElement;
}

export function renderChooseLevelModal({ appEl }:RenderChooseLevelModalProps): void  {
    if (!appEl) {
        console.error("Элемент appEl не найден.");
        return;
    }
    const modalHtml = `
        <div id="modal" class="modal">
            <div class="modal-content">
                <div class="choose-level">
                    <div class="level">
                        <p class="level-text">Выбери сложность</p>
                        <div class="level_checbox">  
                            <div class="radio-toolbar"> 
                                <input type="radio" id="radio1" class="radio_button radio_button_1" name="level" value="1">
                                <label for="radio1">1</label>
                                
                                <input type="radio" id="radio2" class="radio_button radio_button_2" name="level" value="2">
                                <label for="radio2">2</label>
                                
                                <input type="radio" id="radio3" class="radio_button radio_button_3" name="level" value="3">
                                <label for="radio3">3</label>
                            </div> 
                        </div>
                        <button class="start_btn">Старт</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    appEl.innerHTML = modalHtml;

    const modal = document.getElementById("modal") as HTMLElement;
    const startButton = document.querySelector(".start_btn") as HTMLButtonElement;

    // Открываем модальное окно
    modal.style.display = "block";

    // Обрабатываем нажатие на кнопку "Старт"
    startButton.addEventListener("click", () => {
        const levelInput = document.querySelector(
            'input[name="level"]:checked',
        ) as HTMLInputElement | null;
        if (levelInput) {
            selectedLevel = levelInput.value;
            alert(`Вы выбрали уровень сложности: ${selectedLevel}`);
            modal.style.display = "none";
            renderPlayingFields();
        } else {
            alert("Пожалуйста, выберите уровень сложности.");
        }
    });
    //активная кнопка
    document.querySelectorAll<HTMLInputElement>(".radio_button").forEach((radio) => { 
        radio.addEventListener("change", () => {
            document
                .querySelectorAll(".radio-toolbar label")
                .forEach((label) => {
                    label.classList.remove("active");
                });

            if (radio.checked) {
                const label = document.querySelector(
                    `label[for="${radio.id}"]`,
                ) as HTMLInputElement;
                label.classList.add("active");
            }
        });
    });
}

if (appElement) {
    renderChooseLevelModal({ appEl: appElement });
};
