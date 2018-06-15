export default function health(div3, div4) {
    document.querySelector(`${div3}`).style.display = 'none';
    document.querySelector(`${div4}`).style.display = 'block';

    setTimeout(function () {
            makeHealthSound();
            document.querySelector(`${div4}`).style.display = 'none';
        },
        2000);
};

function makeHealthSound() {
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = '../sound/Music_Box.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
}
