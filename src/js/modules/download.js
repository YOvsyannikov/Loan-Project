export default class Download {
    constructor(triggers) {
        this.btns = document.querySelectorAll(triggers); //<- Получаем кнопки
        this.path = 'assets/img/mainbg.jpg'; //<- Путь к файлу для скачивания
    }
// Метод формирования скачивания запроса
    downloadItem(path) {
        const element = document.createElement('a'); //<- создаем элемент с виртуальной ссылкой

        element.setAttribute('href', path); //<- ссылка на скачивания
        element.setAttribute('download', 'nice_picture');

        element.style.display = 'none';
        document.body.appendChild(element); //<- помещаем элемент на страницу

        element.click(); //<- Програмно вызываем клик

        document.body.removeChild(element); //<- Удаляем элемент
    }
// Инициализация скачивания
    init() {
        this.btns.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                this.downloadItem(this.path);
            });
        });
    }
}