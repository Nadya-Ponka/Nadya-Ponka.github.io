export function randomInteger(min, max) {
    let rand = (min - 0.5) + (Math.random() * ((max - min) + 1));
    rand = Math.round(rand);
    return rand;
}

export function soundClickGreat() {
    const audio = new Audio(); // Создаём новый элемент Audio
    audio.src = '../sound/great.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
}

export function soundClickLosing() {
    const audio = new Audio(); // Создаём новый элемент Audio
    audio.src = '../sound/losing.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
}

export function compareRandom() {
    return Math.random() - 0.5;
}
