export default class Difference {
    constructor(oldOfficer, newOfficer, items) {
        try {
            this.oldOfficer = document.querySelector(oldOfficer);
            this.newOfficer = document.querySelector(newOfficer);
            this.oldItems = this.oldOfficer.querySelectorAll(items);
            this.newItems = this.newOfficer.querySelectorAll(items);
            this.oldCounter = 0;
            this.newCounter = 0;
        } catch (e) {
            
        }
    }
//При нажатии на тконку + показывает следующий слайдик. 
//Доходя до последнего элемента, удираем кнопку с +.
    bindTriggers(container, items, counter) {
        container.querySelector('.plus').addEventListener('click', () => {
            if (counter !== items.length - 2) {
                items[counter].style.display = 'flex';
                counter++;
                items[counter].classList.add('fadeIn');
            } else {
                items[counter].style.display = 'flex';
                items[items.length - 1].remove();
            }
        });
    }
//Изначально прячем все элементы кроме последнего.
    hideItems(items) {
        items.forEach((item, i, arr) => {
            if (i !== arr.length - 1) {
                item.style.display = 'none';
                item.classList.add('animated');
            }
        });
    }
// Инициализируем весь слайдер
    init() {
        try {
            this.hideItems(this.oldItems);
        this.hideItems(this.newItems);

        this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
        this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
        } catch (e) {
            
        }
    }
}