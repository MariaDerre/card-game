import { loseRendor } from '../module/lose';

describe('loseRendor', () => {
    beforeEach(() => {
      document.body.innerHTML = `<div class="app"></div>`;
    });
  
    it('should render modal with correct time when called', () => {

      const appElement = document.querySelector('.app');
      
      expect(appElement).toBeTruthy();
      const seconds = 125;
  
      loseRendor(appElement, seconds);
  
      const modal = document.querySelector('#modal');
      expect(modal).toBeTruthy();
  
      expect(modal.querySelector('.text_win').textContent).toBe('Вы проиграли!');
      expect(modal.querySelector('.text_spendTime').textContent).toBe('Затраченное время:');
      expect(modal.querySelector('.spendTime').textContent).toBe('02:05');
    });
  });