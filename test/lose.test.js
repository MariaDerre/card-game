import { loseRendor } from '../module/lose';

describe('loseRendor', () => {
    beforeEach(() => {
      // Создаем элемент с классом 'app' перед каждым тестом
      document.body.innerHTML = `<div class="app"></div>`;
    });
  
    it('should render modal with correct time when called', () => {
      // Здесь вы должны вызвать вашу функцию loseRendor
      const appElement = document.querySelector('.app');
      
      // Убедитесь, что appElement существует
      expect(appElement).toBeTruthy();
      const seconds = 125;
  
      // Вызовите вашу функцию (например, loseRendor) и передайте appElement
      loseRendor(appElement, seconds); // Замените на правильный вызов вашей функции
  
      // Теперь проверьте наличие модального окна
      const modal = document.querySelector('#modal'); // Убедитесь, что ID соответствует вашему коду
      expect(modal).toBeTruthy(); // Проверяем, что модальное окно существует
  
      // Проверяем содержимое модального окна
      expect(modal.querySelector('.text_win').textContent).toBe('Вы проиграли!');
      expect(modal.querySelector('.text_spendTime').textContent).toBe('Затраченное время:');
      expect(modal.querySelector('.spendTime').textContent).toBe('02:05'); // Замените на ожидаемое значение времени
    });
  });