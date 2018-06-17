export function getRandomArbitrary(min, max) {
    return Math.round((Math.random() * (max - min)) + min);
}

export function drawLife(personId, n) {
    document.querySelector(`#${personId}`).style.width = `${`${n * 3}px`}`;
    return n;
}

export function createNode(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach((key) => { element[key] = props[key]; });

    children.forEach((child) => {
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        }

        element.appendChild(child);
    });

    return element;
}

export function makeSounds(path) {
    const audio = new Audio(); // Создаём новый элемент Audio
    audio.src = path; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
}
