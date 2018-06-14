export function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

export function soundClickGreat() {
  let audio = new Audio(); // Создаём новый элемент Audio
  audio.src = '../sound/great.mp3'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}

export function soundClickLosing() {
  let audio = new Audio(); // Создаём новый элемент Audio
  audio.src = '../sound/losing.mp3'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}

export function compareRandom(a, b) {
  return Math.random() - 0.5;
}