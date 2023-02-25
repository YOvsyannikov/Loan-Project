export default class Slider {
    constructor (page, btns){
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btns);
        this.slideIndex = 1;
    }
// Покажывает наш слайд и показывает направление его движение
    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }
// Скрывает и показывает всплывающий слайд в 3м слайде
        try {
            this.hanson.style.opacity = '0';

            if (n == 3){
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }
        }catch(e){}
        
// Скрываем все ненужные нам слайды
        Array.from(this.slides).forEach(slide => {
            slide.style.display = 'none';
        });
// Показываем только тот который по умолчанию
            this.slides[this.slideIndex - 1].style.display = 'block';
        }

        plusSlides(n) {
            this.showSlides(this.slideIndex += n);
        }
// Обработчик события который переключает наш слайд
        render() {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch(e){}
            
            this.btns.forEach(item => {
                item.addEventListener('click', () => {
                    this.plusSlides(1);
                });
// Нажимая на логотип возвращаемся на первый слайд
            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        this.showSlides(this.slideIndex);
    }
}
