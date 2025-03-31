import { renderPlayingFields } from "../module/playing-field.js";
import "./style.css";

export const appElement = document.querySelector(".app");

export let selectedLevel;

export function renderChooseLevelModal({ appEl }) {
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

    const modal = document.getElementById("modal");
    const startButton = document.querySelector(".start_btn");

    // Открываем модальное окно
    modal.style.display = "block";

    // Обрабатываем нажатие на кнопку "Старт"
    startButton.addEventListener("click", () => {
        const levelInput = document.querySelector(
            'input[name="level"]:checked',
        );
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
    document.querySelectorAll(".radio_button").forEach((radio) => {
        radio.addEventListener("change", () => {
            // Удаляем класс выделения у всех меток
            document
                .querySelectorAll(".radio-toolbar label")
                .forEach((label) => {
                    label.classList.remove("active");
                });

            // Добавляем класс выделения к метке, связанной с нажатой радиокнопкой
            if (radio.checked) {
                const label = document.querySelector(
                    `label[for="${radio.id}"]`,
                );
                label.classList.add("active");
            }
        });
    });
}

renderChooseLevelModal({ appEl: appElement });