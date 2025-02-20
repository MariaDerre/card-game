const appElement = document.querySelector('.app')
function renderChooseLevelComponent({ appEl }) {
    const chooseLevelHtml = `
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
    `;

    appEl.innerHTML = chooseLevelHtml;

    // Добавляем обработчик события для кнопки "Старт"
    document.querySelector('.start_btn').addEventListener('click', () => {
        const selectedLevel = document.querySelector('input[name="level"]:checked');
        if (selectedLevel) {
            alert(`Вы выбрали уровень сложности: ${selectedLevel.value}`);
            // Здесь вы можете добавить логику для перехода к следующему этапу
        } else {
            alert('Пожалуйста, выберите уровень сложности.');
        }
    });
}
renderChooseLevelComponent({ appEl: appElement });