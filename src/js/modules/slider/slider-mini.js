import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }
// Удаляет активный класс в слайдере
    decorizeSlides() {
        Array.from(this.slides).forEach((slide) => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector(".card__title").style.opacity = "0.4";
                slide.querySelector(".card__controls-arrow").style.opacity =
                    "0";
            }
        });
// Если активный первый слайд не является кнопкой, добавляем класс.
// Если активный первый слайд является кнопкой, не добавляем класс.
        if (!this.slides[0].closest("button")) {
// Добавляет активный класс в слайдере и показывает текст слайда и стрелку
            this.slides[0].classList.add(this.activeClass);
        }

        if (this.animate) {
            this.slides[0].querySelector(".card__title").style.opacity = "1";
            this.slides[0].querySelector(
                ".card__controls-arrow"
            ).style.opacity = "1";
        }
    }

    nextSlide() {
        if (
            this.slides[1].tagName == "BUTTON" &&
            this.slides[2].tagName == "BUTTON"
        ) {
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.container.appendChild(this.slides[2]); // Btn
            this.decorizeSlides();
        } else if (this.slides[1].tagName == "BUTTON") {
            this.container.appendChild(this.slides[0]); // Slide
            this.container.appendChild(this.slides[1]); // Btn
            this.decorizeSlides();
        } else {
            this.container.appendChild(this.slides[0]);
            this.decorizeSlides();
        }
    }
// При нажатии на кнопку next первый слайд перемещается в конец
    bindTriggers() {
        this.next.addEventListener("click", () => this.nextSlide());
// При надатии на кнопку prev последний слайд перемещается в начало
        this.prev.addEventListener("click", () => {
            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== "BUTTON") {
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });
    }
//Условия выполнения в автоматическом режиме с таймером для горизонтального слайдера на 3й странице
    activateAnimation() {
        this.paused = setInterval(() => this.nextSlide(), 5000);
    }
// Инициализация плеера
    init() {
        this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: flex-start;
    `;

        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoplay) {
// При наведении мышккой на слайдер или кнопки, слайдер останавливается
            this.container.addEventListener("mouseenter", () =>
                clearInterval(this.paused)
            );
            this.next.addEventListener("mouseenter", () =>
                clearInterval(this.paused)
            );
            this.prev.addEventListener("mouseenter", () =>
                clearInterval(this.paused)
            );
// Если убипаем мышку со слайдера или кнопок, слайдер продолжает работать
            this.container.addEventListener("mouseleave", () =>
                this.activateAnimation()
            );
            this.next.addEventListener("mouseleave", () =>
                this.activateAnimation()
            );
            this.prev.addEventListener("mouseleave", () =>
                this.activateAnimation()
            );
            this.activateAnimation();
        }
    }
}
